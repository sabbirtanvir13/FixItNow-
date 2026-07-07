import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { BookingService } from "./booking.service";




const createBooking =
catchAsync(async(
req:Request,
res:Response
)=>{


const userId = req.user?.id as string;


const booking =
await BookingService.createBookingIntoDB(
 userId,
 req.body
);



sendResponse(res,{

success:true,

statusCode:httpStatus.CREATED,

message:"Booking created successfully",

data:booking

});


});








const getMyBookings =
catchAsync(async(
req:Request,
res:Response
)=>{


const userId=req.user?.id as string;



const bookings =
await BookingService.getMyBookingsFromDB(
 userId
);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Bookings fetched successfully",

data:bookings

});


});








const getSingleBooking =
catchAsync(async(
req:Request,
res:Response
)=>{


const userId=req.user?.id as string;



const booking =
await BookingService.getSingleBookingFromDB(

req.params.id as string,

userId

);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Booking fetched successfully",

data:booking

});


});





export const BookingController={

createBooking,

getMyBookings,

getSingleBooking

};