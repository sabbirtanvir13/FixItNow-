import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utlis/catchAsync";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../utlis/sendResponse";



const createCategory =
catchAsync(async(
 req: Request,
 res: Response
)=>{


const category =
await CategoryService.createCategoryIntoDB(
 req.body
);



sendResponse(res,{

 success:true,

 statusCode:httpStatus.CREATED,

 message:"Category created successfully",

 data:category

});


});






const getAllCategories =
catchAsync(async(
 req: Request,
 res: Response
)=>{


const categories =
await CategoryService.getAllCategoriesFromDB();



sendResponse(res,{

 success:true,

 statusCode:httpStatus.OK,

 message:"Categories fetched successfully",

 data:categories

});


});





export const CategoryController = {

 createCategory,

 getAllCategories

};