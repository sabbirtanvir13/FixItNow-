

import httpStatus from "http-status";
import { Request, Response, } from "express";
import { AuthService,  } from "./auth.service";


const RegisterUser =  async (req: Request, res: Response) => {
 const payload = req.body;
 
 const user =await AuthService.RegisterUserIntoDB(payload);
 
 res.status(200).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Registration successful", 
    data:{
     user
    }
    });
 }


 export const AuthController = {
  RegisterUser,
}