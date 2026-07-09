


import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { RegisterUserPayload, ILoginUser } from "./auth.interface";
import { jwtUtils } from "../../utlis/jwt";
import { SignOptions } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/enums";


const RegisterUserIntoDB = async (
  payload: RegisterUserPayload
) => {

  const {
    email,
    password,
    name,
    role,
    profilePhoto
  } = payload;


  const isUserExists = await prisma.user.findUnique({
    where:{
      email
    }
  });


  if(isUserExists){
    throw new Error("User already exists");
  }



  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_Salt_Rounds)
  );



  const createdUser = await prisma.user.create({

    data:{
      email,
      password: hashedPassword,
      name,
      role
    }

  });



  // শুধু Technician হলে profile create হবে

  if(role === Role.Technician){

    await prisma.technicianProfile.create({

      data:{
        userId: createdUser.id,
        profilePhoto
      }

    });

  }




  const user = await prisma.user.findUnique({

    where:{
      id: createdUser.id
    },


    omit:{
      password:true
    },


    include:{
      technicianProfile:true
    }

  });



  return user;

};




// LOGIN

const loginUserIntoDB = async (
 payload: ILoginUser
)=>{


const {
 email,
 password
}=payload;



const user = await prisma.user.findUniqueOrThrow({

 where:{
  email
 }

});



const isPasswordMatched =
 await bcrypt.compare(
  password,
  user.password
 );



if(!isPasswordMatched){

 throw new Error("Invalid password");

}




const jwtPayload={

 id:user.id,
 name:user.name,
 email:user.email,
 role:user.role

};




const accessToken =
jwtUtils.createToken(

 jwtPayload,

 config.jwt_access_secret,

 config.jwt_access_expires_in as SignOptions

);





const refreshToken =
jwtUtils.createToken(

 jwtPayload,

 config.jwt_refresh_secret,

 config.jwt_refresh_expires_in as SignOptions

);




return {

 user,

 accessToken,

 refreshToken

};


};





const refreshTokenIntoDB = async (token: string) => {
  const verifiedToken = jwtUtils.verifyToken(
    token,
    config.jwt_refresh_secret
  ) as any;

  if (typeof verifiedToken === "string") {
    throw new Error(verifiedToken);
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: verifiedToken.id,
    },
  });

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

  return {
    accessToken,
  };
};




// GET ME

const getMeIntoDB = async(
 userId:string
)=>{


const user =
await prisma.user.findFirstOrThrow({

where:{
 id:userId
},


omit:{
 password:true
},


include:{
 technicianProfile:true
}


});


return user;


};




// UPDATE BASIC USER INFO

const updateProfileIntoDB = async(

 userId:string,

 payload:any

)=>{


const updatedUser =
await prisma.user.update({

where:{
 id:userId
},


data:{

 name:payload.name

},



omit:{
 password:true
},


include:{
 technicianProfile:true
}



});


return updatedUser;


};




export const AuthService={

 RegisterUserIntoDB,

 loginUserIntoDB,

 getMeIntoDB,
refreshTokenIntoDB,

 updateProfileIntoDB

};