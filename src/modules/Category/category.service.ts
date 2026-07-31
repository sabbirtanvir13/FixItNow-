import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";

// Create Category
const createCategoryIntoDB = async (payload: { name: string; description?: string }) => {
    const isExist = await prisma.category.findUnique({
        where: {
            name: payload.name,
        },
    });

    if (isExist) {
        throw new Error("Category already exists");
    }

    const category = await prisma.category.create({
        data: {
            name: payload.name,
            description: payload.description,
        },
    });

    return category;
};

// Get All Categories
const getAllCategoriesFromDB = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            created_at: "desc",
        },
    });

    return categories;
};

// Get Single Category by ID
const getSingleCategoryFromDB = async (id: string) => {
    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    });

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

// Update Category
const updateCategoryIntoDB = async (id: string, payload: Partial<ICategory>) => {
    const existingCategory = await prisma.category.findUnique({
        where: {
            id,
        },
    });

    if (!existingCategory) {
        throw new Error("Category not found");
    }

    if (payload.name && payload.name !== existingCategory.name) {
        const nameExist = await prisma.category.findUnique({
            where: {
                name: payload.name,
            },
        });

        if (nameExist) {
            throw new Error("Category with this name already exists");
        }
    }

    const updatedCategory = await prisma.category.update({
        where: {
            id,
        },
        data: payload,
    });

    return updatedCategory;
};

// Delete Category
const deleteCategoryFromDB = async (id: string) => {
    const existingCategory = await prisma.category.findUnique({
        where: {
            id,
        },
    });

    if (!existingCategory) {
        throw new Error("Category not found");
    }

    const deletedCategory = await prisma.category.delete({
        where: {
            id,
        },
    });

    return deletedCategory;
};

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB,
};