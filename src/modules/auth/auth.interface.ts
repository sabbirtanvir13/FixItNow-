

import { Role } from "../../../generated/prisma/client";





export interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
  role: Role;
  profilePhoto?: string;
}


export interface ILoginUser {
  email: string;
  password: string;
}