export interface UpdateTechnicianProfilePayload {
  profilePhoto?: string;
  bio?: string;
  experience_years?: number;
  skills?: string[];
  location?: string;
  hourly_rate?: number;
}