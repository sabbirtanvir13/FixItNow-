;

import httpStatus from "http-status";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";



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

export const AuthController = {
  RegisterUser,
};