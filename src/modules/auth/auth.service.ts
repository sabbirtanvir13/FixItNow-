


// import httpStatus from "http-status";
// import { prisma } from "../../lib/prisma";
// import config from "../../config";
// import bcrypt from "bcryptjs";
// import { RegisterUserPayload, ILoginUser } from "./auth.interface";
// import { jwtUtils } from "../../utlis/jwt";
// import { SignOptions } from "jsonwebtoken";
// import { Role } from "../../../generated/prisma/enums";

// class AppError extends Error {
//   statusCode: number;

//   constructor(statusCode: number, message: string) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

// // REGISTER
// const RegisterUserIntoDB = async (payload: RegisterUserPayload) => {
//   if (!payload) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Registration payload is missing");
//   }

//   if (!payload.email) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
//   }

//   const { email, password, name, role, profilePhoto } = payload;

//   if (role === Role.Admin) {
//     throw new Error("You are not authorized to create an Admin account! Admins can only log in.");
//   }

//   const isUserExists = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (isUserExists) {
//     throw new Error("User already exists");
//   }

//   const hashedPassword = await bcrypt.hash(
//     password,
//     Number(config.bcrypt_Salt_Rounds)
//   );

//   const createdUser = await prisma.$transaction(async (tx) => {
//     const user = await tx.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         name,
//         role,
//       },
//     });

//     if (role === Role.Technician) {
//       await tx.technicianProfile.create({
//         data: {
//           userId: user.id,
//           profilePhoto,
//         },
//       });
//     }

//     return user;
//   });


//   const user = await prisma.user.findUnique({
//     where: { id: createdUser.id },
//     omit: { password: true },
//     include: { technicianProfile: true },
//   });

//   if (!user) {
//     throw new Error("User creation failed");
//   }


//   const jwtPayload = {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };

//   const accessToken = jwtUtils.createToken(
//     jwtPayload,
//     config.jwt_access_secret,
//     config.jwt_access_expires_in as SignOptions
//   );

//   const refreshToken = jwtUtils.createToken(
//     jwtPayload,
//     config.jwt_refresh_secret,
//     config.jwt_refresh_expires_in as SignOptions
//   );

//   return {
//     user,
//     accessToken,
//     refreshToken,
//   };
// };


// const loginUserIntoDB = async (payload: ILoginUser) => {
//   if (!payload) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Login payload is missing");
//   }

//   if (!payload.email) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
//   }

//   const { email, password } = payload;

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const isPasswordMatched = await bcrypt.compare(password, user.password);

//   if (!isPasswordMatched) {
//     throw new Error("Invalid password");
//   }

//   const jwtPayload = {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };

//   const accessToken = jwtUtils.createToken(
//     jwtPayload,
//     config.jwt_access_secret,
//     config.jwt_access_expires_in as SignOptions
//   );

//   const refreshToken = jwtUtils.createToken(
//     jwtPayload,
//     config.jwt_refresh_secret,
//     config.jwt_refresh_expires_in as SignOptions
//   );

//   const { password: _, ...userWithoutPassword } = user;

//   return {
//     user: userWithoutPassword,
//     accessToken,
//     refreshToken,
//   };
// };

// // REFRESH TOKEN
// const refreshTokenIntoDB = async (token: string) => {
//   const verifiedToken = jwtUtils.verifyToken(
//     token,
//     config.jwt_refresh_secret
//   ) as any;

//   if (typeof verifiedToken === "string") {
//     throw new Error(verifiedToken);
//   }

//   const user = await prisma.user.findUnique({
//     where: { id: verifiedToken.id },
//   });

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const jwtPayload = {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };

//   const accessToken = jwtUtils.createToken(
//     jwtPayload,
//     config.jwt_access_secret,
//     config.jwt_access_expires_in as SignOptions
//   );

//   return { accessToken };
// };

// // GET ME
// const getMeIntoDB = async (userId: string) => {
//   const user = await prisma.user.findFirstOrThrow({
//     where: { id: userId },
//     omit: { password: true },
//     include: { technicianProfile: true },
//   });

//   return user;
// };

// // UPDATE BASIC USER INFO
// const updateProfileIntoDB = async (userId: string, payload: any) => {
//   const updatedUser = await prisma.user.update({
//     where: { id: userId },
//     data: { name: payload.name },
//     omit: { password: true },
//     include: { technicianProfile: true },
//   });

//   return updatedUser;
// };

// export const AuthService = {
//   RegisterUserIntoDB,
//   loginUserIntoDB,
//   refreshTokenIntoDB,
//   getMeIntoDB,
//   updateProfileIntoDB,
// };
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { RegisterUserPayload, ILoginUser } from "./auth.interface";
import { jwtUtils } from "../../utlis/jwt";
import { SignOptions } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/enums";

class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const RegisterUserIntoDB = async (payload: RegisterUserPayload) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, "Registration payload is missing");
  }

  if (!payload.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  const { email, password, name, role, profilePhoto } = payload;

  if (role === Role.Admin) {
    throw new Error("You are not authorized to create an Admin account! Admins can only log in.");
  }

  const isUserExists = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_Salt_Rounds)
  );

  const createdUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    if (role === Role.Technician) {
      await tx.technicianProfile.create({
        data: {
          userId: user.id,
          profilePhoto: profilePhoto || null,
        },
      });
    }

    return user;
  });

  const user = await prisma.user.findUnique({
    where: { id: createdUser.id },
    omit: { password: true },
    include: { technicianProfile: true },
  });

  if (!user) {
    throw new Error("User creation failed");
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

const loginUserIntoDB = async (payload: ILoginUser) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, "Login payload is missing");
  }

  if (!payload.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { technicianProfile: true },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

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

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
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

  const user = await prisma.user.findUnique({
    where: { id: verifiedToken.id },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
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

  return { accessToken };
};

const getMeIntoDB = async (userId: string) => {
  const user = await prisma.user.findFirstOrThrow({
    where: { id: userId },
    omit: { password: true },
    include: { technicianProfile: true },
  });

  return user;
};

const updateProfileIntoDB = async (userId: string, payload: any) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name: payload.name },
    omit: { password: true },
    include: { technicianProfile: true },
  });

  return updatedUser;
};

export const AuthService = {
  RegisterUserIntoDB,
  loginUserIntoDB,
  refreshTokenIntoDB,
  getMeIntoDB,
  updateProfileIntoDB,
};