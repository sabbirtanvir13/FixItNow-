import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { ServiceService } from "./service.service";




// Create Service

const createService =
catchAsync(async(
req:Request,
res:Response
)=>{


const userId =
req.user?.id as string;



const service =
await ServiceService.createServiceIntoDB(

userId,

req.body

);



sendResponse(res,{

success:true,

statusCode:httpStatus.CREATED,

message:"Service created successfully",

data:service

});


});








// Get All Service + Filter

const getAllServices =
catchAsync(async(

req:Request,

res:Response

)=>{


const services =
await ServiceService.getAllServicesFromDB(

req.query

);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Services fetched successfully",

data:services

});


});








// Single Service

const getSingleService =
catchAsync(async(

req:Request,

res:Response

)=>{


const service =
await ServiceService.getSingleServiceFromDB(

req.params.id as string

);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Service fetched successfully",

data:service

});


});






export const ServiceController={

createService,

getAllServices,

getSingleService

};