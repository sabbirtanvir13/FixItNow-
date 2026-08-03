

// import httpStatus from "http-status";
// import { Request, Response, NextFunction } from "express";
// import { AuthService } from "./auth.service";
// import { catchAsync } from "../../utlis/catchAsync";
// import { sendResponse } from "../../utlis/sendResponse";
// import config from "../../config";
// import { jwtUtils } from "../../utlis/jwt";

// const RegisterUser = catchAsync(async (req: Request, res: Response) => {
//   console.log("RegisterUser req.body:", req.body);
//   console.log("RegisterUser req.file:", req.file);

//   const bodyData = req.body && "payload" in req.body ? req.body.payload : req.body || {};
  
//   const uploadedImage = req.file ? req.file.path || req.file.filename : undefined;
//   const profilePhoto = uploadedImage || bodyData.profilePhoto || bodyData.profileImage;

//   const payload = {
//     ...bodyData,
//     name: bodyData.name || req.body.name,
//     email: bodyData.email || req.body.email,
//     password: bodyData.password || req.body.password,
//     role: bodyData.role || req.body.role,
//     ...(profilePhoto ? { profilePhoto } : {}),
//   };

//   const user = await AuthService.RegisterUserIntoDB(payload);

//   return sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "Registration successful",
//     data: user,
//   });
// });

// const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   console.log("loginUser req.body:", req.body);
//   const payload = req.body && "payload" in req.body ? req.body.payload : req.body || {};
   
//   const { accessToken, refreshToken } = await AuthService.loginUserIntoDB(payload);

//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     secure: false, 
//     sameSite: "lax",
//     maxAge: 1000 * 60 * 60 * 24,
//   });

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: false, 
//     sameSite: "lax",
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   });

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Login successful",
//     data: { accessToken, refreshToken },
//   });
// });

// const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { accessToken } = req.cookies;
  
//   const VerifiedtokenResponse = jwtUtils.verifyToken(
//     accessToken,
//     config.jwt_access_secret,
//   ) as any;

//   if (typeof VerifiedtokenResponse === "string") {
//     throw new Error(VerifiedtokenResponse);
//   }

//   const profile = await AuthService.getMeIntoDB(req.user!.id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "User profile fetched successfully",
//     data: { profile },
//   });
// });

// const updatedProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.user?.id as string;
//   const payload = req.body;

//   const updatedUser = await AuthService.updateProfileIntoDB(userId, payload);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Profile updated successfully",
//     data: { user: updatedUser },
//   });
// });

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const token = req.cookies.refreshToken;

//   if (!token) {
//     throw new Error("Refresh token is missing");
//   }

//   const result = await AuthService.refreshTokenIntoDB(token);

//   res.cookie("accessToken", result.accessToken, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "none",
//     maxAge: 1000 * 60 * 60 * 24,
//   });

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Access token refreshed successfully",
//     data: result,
//   });
// });

// export const AuthController = {
//   RegisterUser,
//   loginUser,
//   getMe,
//   updatedProfile,
//   refreshToken,
// };
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import config from "../../config";
import { jwtUtils } from "../../utlis/jwt";

// const RegisterUser = catchAsync(async (req: Request, res: Response) => {

//   console.log("RegisterUser req.body:", req.body);
//   console.log("RegisterUser req.file:", req.file);

//   const bodyData = req.body?.payload || req.body || {};
  
//   const uploadedImage = req.file ? req.file.path || req.file.filename : undefined;
//   const profilePhoto = uploadedImage || bodyData.profilePhoto || bodyData.profileImage;

//   const payload = {
//     ...bodyData,
//     name: bodyData.name || req.body?.name,
//     email: bodyData.email || req.body?.email,
//     password: bodyData.password || req.body?.password,
//     role: bodyData.role || req.body?.role,
//     ...(profilePhoto ? { profilePhoto } : {}),
//   };

//   const user = await AuthService.RegisterUserIntoDB(payload);

//   return sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "Registration successful",
//     data: user,
//   });
// });


const RegisterUser = catchAsync(async (req: Request, res: Response) => {
  console.log("RegisterUser req.body:", req.body);
  console.log("RegisterUser req.file:", req.file);

  // FormData বা JSON যাই আসুক না কেন, ডেটা সেফলি এক্সট্রাক্ট করা
  const bodyData = req.body || {};
  
  const uploadedImage = req.file ? req.file.path || req.file.filename : undefined;
  const profilePhoto = uploadedImage || bodyData.profilePhoto || bodyData.profileImage;

  const payload = {
    name: bodyData.name,
    email: bodyData.email,
    password: bodyData.password,
    role: bodyData.role,
    ...(profilePhoto ? { profilePhoto } : {}),
  };

  const user = await AuthService.RegisterUserIntoDB(payload);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Registration successful",
    data: user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("loginUser req.body:", req.body);
  
  const payload = req.body?.payload || req.body || {};
    
  const { accessToken, refreshToken } = await AuthService.loginUserIntoDB(payload);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: { accessToken, refreshToken },
  });
});

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new Error("Unauthorized access");
  }

  const profile = await AuthService.getMeIntoDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile fetched successfully",
    data: { profile },
  });
});

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

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new Error("Refresh token is missing");
  }

  const result = await AuthService.refreshTokenIntoDB(token);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token refreshed successfully",
    data: result,
  });
});

export const AuthController = {
  RegisterUser,
  loginUser,
  getMe,
  updatedProfile,
  refreshToken,
};