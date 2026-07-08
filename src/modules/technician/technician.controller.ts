import { Request, Response } from "express";
import httpStatus from "http-status";
import { TechnicianService } from "./technician.service";
import { sendResponse } from "../../utlis/sendResponse";
import { catchAsync } from "../../utlis/catchAsync";






const updateTechnicianProfile =
catchAsync(async(
 req:Request,
 res:Response
)=>{


const userId =
req.user!.id;



const profile =
await TechnicianService.updateTechnicianProfileIntoDB(

 userId,

 req.body

);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Technician profile updated successfully",

data:profile


});


});







const getTechnicianProfile =
catchAsync(async(
req:Request,
res:Response
)=>{


const profile =
await TechnicianService.getTechnicianProfileFromDB(

req.user!.id

);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Technician profile fetched successfully",

data:profile


});


});



const getTechnicianBookings =
catchAsync(async(
req:Request,
res:Response
)=>{


const userId = req.user!.id;


const bookings =
await TechnicianService.getTechnicianBookingsFromDB(
 userId
);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Technician bookings fetched successfully",

data:bookings

});


});





const updateBookingStatus =
catchAsync(async(
req:Request,
res:Response
)=>{


const userId = req.user!.id;


const booking =
await TechnicianService.updateBookingStatusIntoDB(

 userId,

 req.params.id as string,

 req.body.status

);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Booking status updated successfully",

data:booking

});


});



export const TechnicianController={

updateTechnicianProfile,

getTechnicianProfile,
getTechnicianBookings,

updateBookingStatus

};