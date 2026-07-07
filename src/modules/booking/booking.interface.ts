export interface ICreateBooking {

  technician_id: string;

  service_id: string;

  booking_date: string;

  start_time: string;

  end_time: string;

  price: number;

}


export interface IUpdateBookingStatus {

  status:
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

}