
import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { RegisterUserPayload } from "./auth.interface";
import { ILoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utlis/jwt";

const RegisterUserIntoDB = async (payload: RegisterUserPayload) => {
     const { email, password ,name,profilephoto,role} = payload;
const isUserExists = await prisma.user.findUnique({
   where: { email },
 });
 
 if (isUserExists) {
   throw new Error("User already exists");
 }
 
 const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_Salt_Rounds));
 
 const CreatedUser = await prisma.user.create({
   data:{
     email,
     password: hashedPassword,
     name,
      role 

    
   }
 })
 
 await prisma.profile.create({
   data:{
     userId: CreatedUser.id,
     profilephoto
   }
 });
 
 const user = await prisma.user.findUnique({
   where: { 
     id: CreatedUser.id,
     email: CreatedUser.email || email
     },
     omit: { password: true },
   include: { profile: true },
 });
 return user;
 
}



const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }

   const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };



  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );



  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};
const getMeIntoBD = async(userId : string) => {
const user = await prisma.user.findFirstOrThrow({
        where : {id : userId},
        omit : {
            password : true
        },
        include : {
            profile : true
        }
        
    });

    return user;
}



const updateProfileIntoDB = async (userId: string, payload: any) => {
 const { name, email, profilePhoto, bio, experience_years } = payload;

 const updatedUser = await prisma.user.update({
   where: { id: userId },
   data: {
      name,
      email,
      profile: {
        update: {
          profilePhoto,
          bio,
          experience_years,
        },
      },
   },
  
   omit: {
     password: true,
   },
   include: {
     profile: true,
   },

 });

 return updatedUser;
};

export const AuthService = {
  RegisterUserIntoDB,
  loginUserIntoDB,
  getMeIntoBD,
  updateProfileIntoDB,
}