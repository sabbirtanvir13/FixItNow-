// import { NextFunction, Request, Response } from "express";

// import { catchAsync } from "../utlis/catchAsync";
// import config from "../config";
// import { jwtUtils } from "../utlis/jwt";
// import { prisma } from "../lib/prisma";
// import { JwtPayload } from "jsonwebtoken";
// import { Role ,Active_Status} from "../../generated/prisma/enums";



// declare global {
//     namespace Express {
//         interface Request {
//             user?: {
//                 email: string;
//                 name: string;
//                 id: string;
//                 role: Role;
//             }
//         }
//     }
// }

// export const auth = (...requiredRoles : Role[]) => {
//     return catchAsync
//     (async (req: Request, res: Response, next: NextFunction) => {
//         const token = req.cookies.accessToken ?
//             req.cookies.accessToken 
//             :
//             req.headers.authorization?.startsWith("Bearer ") ? 
//             req.headers.authorization?.split(" ")[1] 
//             : req.headers.authorization;

//         if(!token){
//             const error: any = new Error("You are not logged in. Please log in to access this resource.");
//             error.statusCode = 401;
//             throw error;
//         }

//         const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

//         if (!verifiedToken.success) {
//             const error: any = new Error(verifiedToken.error);
//             error.statusCode = 401;
//             throw error;
//         }

//         const { email, name, id, role } = verifiedToken.data as JwtPayload;

//         if(requiredRoles.length && !requiredRoles.includes(role)){
//             const error: any = new Error("Forbidden. You don't have permission to access this resource.");
//             error.statusCode = 403;
//             throw error;
//         }

//         const user = await prisma.user.findUnique({
//             where: {
//                 id
//             }
//         });

//         if(!user){
//             const error: any = new Error("User not found. Please log in again.");
//             error.statusCode = 401;
//             throw error;
//         }

//         if (user.active_status === Active_Status.Blocked) {
//             const error: any = new Error("Your account has been blocked. Please contact support.");
//             error.statusCode = 403;
//             throw error;
//         }

//         req.user = {
//             email,
//             name,
//             id,
//             role
//         }

//         next();
        
//     }
// )
// }



import { NextFunction, Request, Response } from "express";

import config from "../config";

import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import { Role, Active_Status } from "../../generated/prisma/enums";
import { catchAsync } from "../utlis/catchAsync";
import { jwtUtils } from "../utlis/jwt";


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}


export const auth = (...requiredRoles: Role[]) => {

return catchAsync(
async(
req:Request,
res:Response,
next:NextFunction
)=>{


const token =
req.cookies?.accessToken ||
req.headers.authorization?.replace("Bearer ","");


if(!token){

const error:any =
new Error(
"You are not logged in"
);

error.statusCode = 401;

throw error;

}



const verifiedToken =
jwtUtils.verifyToken(
token,
config.jwt_access_secret
);



if(!verifiedToken.success){

const error:any =
new Error(
"Invalid or expired token"
);

error.statusCode = 401;

throw error;

}



const payload =
verifiedToken.data as JwtPayload;



const user =
await prisma.user.findUnique({

where:{
id:payload.id
}

});

console.log("JWT Payload:", payload);
console.log("DB User:", user);
console.log("Required Roles:", requiredRoles);
console.log("User Role:", user?.role);




if(!user){

const error:any =
new Error(
"User not found"
);

error.statusCode = 401;

throw error;

}



if(user.active_status === Active_Status.Blocked){


const error:any =
new Error(
"Your account is blocked"
);

error.statusCode = 403;

throw error;


}



if(
requiredRoles.length &&
!requiredRoles.includes(user.role)
){


const error:any =
new Error(
"Forbidden. You don't have permission to access this resource."
);

error.statusCode = 403;

throw error;


}



req.user = {

id:user.id,

name:user.name,

email:user.email,

role:user.role

};



next();



}

)


}