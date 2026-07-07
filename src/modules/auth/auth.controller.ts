;

import httpStatus from "http-status";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";

import { NextFunction } from "express";
import config from "../../config";
import { jwtUtils } from "../../utlis/jwt";

const RegisterUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await AuthService.RegisterUserIntoDB(payload);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Registration successful",
    data: user,
  });
});



const loginUser = catchAsync(async (req: Request, res: Response,next: NextFunction) => {
   const payload = req.body;
   
   const {accessToken, refreshToken} = await AuthService.loginUserIntoDB(payload);


    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });



 sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: { accessToken, refreshToken },
  });
});


const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    

    const VerifiedtokenResponse = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    ) as any;

    if (typeof VerifiedtokenResponse === "string") {
      throw new Error(VerifiedtokenResponse);
    }

   

    const profile = await AuthService.getMeIntoDB(VerifiedtokenResponse.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: { profile },
    });
  },
);


  const updatedProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const userId = req.user?.id as string;
   const payload = req.body;

   const updatedUser = await AuthService.updateProfileIntoDB(userId, payload);

   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: "Profile updated successfully",
     data: { user: updatedUser },
   });
 });

export const AuthController = {
  RegisterUser,
  loginUser,
  getMe,
  updatedProfile,
};
