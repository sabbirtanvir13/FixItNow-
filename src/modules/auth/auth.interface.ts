import { Role } from "../../../generated/prisma/enums";







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