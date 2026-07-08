import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { AdminService } from "./admin.service";


const getAllUsers =catchAsync(async(req:Request,res:Response)=>{

const users =await AdminService.getAllUsersFromDB();

sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Users fetched successfully",

data:users

});


});



const updateUserStatus =catchAsync(async(req:Request,res:Response)=>{


const user =await AdminService.updateUserStatusIntoDB(
req.params.id as string,

req.body

);



sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"User status updated successfully",

data:user

});


});



const getAllBookings =catchAsync(async(req:Request,res:Response)=>{
const bookings =await AdminService.getAllBookingsFromDB();


sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Bookings fetched successfully",

data:bookings

});


});



const getAllCategories =catchAsync(async(req:Request,res:Response)=>{

const categories =await AdminService.getAllCategoriesFromDB();

sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Categories fetched successfully",

data:categories

});


});



const createCategory =catchAsync(async(req:Request,res:Response)=>{
const category =await AdminService.createCategoryIntoDB(
req.body
);



sendResponse(res,{

success:true,

statusCode:httpStatus.CREATED,

message:"Category created successfully",

data:category

});


});



export const AdminController={


getAllUsers,

updateUserStatus,

getAllBookings,

getAllCategories,

createCategory


};