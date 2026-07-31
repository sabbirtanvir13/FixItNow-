import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utlis/catchAsync";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../utlis/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await CategoryService.createCategoryIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category created successfully",
        data: category,
    });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await CategoryService.getAllCategoriesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories fetched successfully",
        data: categories,
    });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const category = await CategoryService.getSingleCategoryFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category fetched successfully",
        data: category,
    });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const category = await CategoryService.updateCategoryIntoDB(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category updated successfully",
        data: category,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const category = await CategoryService.deleteCategoryFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category deleted successfully",
        data: category,
    });
});

export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};