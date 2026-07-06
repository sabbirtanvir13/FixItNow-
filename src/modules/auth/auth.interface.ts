
export interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
  role?: 'Customer' | 'Technician';
  profilephoto: string;
}


export interface ILoginUser {
  email : string;
  password :string;
}