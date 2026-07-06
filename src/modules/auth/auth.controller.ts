

import httpStatus from "http-status";
import { Request, Response,  } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utlis/catchAsync";



const RegisterUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await AuthService.RegisterUserIntoDB(payload);

  return res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Registration successful",
    data: {
      user,
    },
  });
});

export const AuthController = {
  RegisterUser,
};