
import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { RegisterUserPayload } from "./auth.interface";




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

export const AuthService = {
  RegisterUserIntoDB,
}
