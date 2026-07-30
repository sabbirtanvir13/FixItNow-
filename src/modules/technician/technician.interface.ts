// export interface UpdateTechnicianProfilePayload {
//   profilePhoto?: string;
//   bio?: string;
//   experience_years?: number;
//   skills?: string[];
//   location?: string;
//   hourly_rate?: number;
// }


// export interface AvailabilityPayload {

//   day:string;

//   start_time:string;

//   end_time:string;

//   is_available?:boolean;

// }


export interface UpdateTechnicianProfilePayload {
  profilePhoto?: string;
  bio?: string;
  experience_years?: number;
  skills?: string[];
  location?: string;
  hourly_rate?: number;
}

export interface AvailabilityPayload {
  day: string;
  start_time: string;
  end_time: string;
  is_available?: boolean;
}

// বুকিং স্ট্যাটাসের টাইপ ভ্যালিডেশনের জন্য
export type BookingStatus = 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';