
export interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
  role?: 'Customer' | 'Technician';
  profilephoto: string;
}