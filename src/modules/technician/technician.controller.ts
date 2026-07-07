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





export const TechnicianController={

updateTechnicianProfile,

getTechnicianProfile

};