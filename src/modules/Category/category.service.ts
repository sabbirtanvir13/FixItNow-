import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";




const createCategoryIntoDB = async(
 payload: ICategory
)=>{


const isExist =
await prisma.category.findUnique({

 where:{
  name: payload.name
 }

});


if(isExist){
 throw new Error("Category already exists");
}



const category =
await prisma.category.create({

 data:{
  name: payload.name,
  description: payload.description
 }

});


return category;

};






const getAllCategoriesFromDB = async()=>{


const categories =
await prisma.category.findMany({

 orderBy:{
  created_at:"desc"
 }

});


return categories;

};





export const CategoryService = {

 createCategoryIntoDB,

 getAllCategoriesFromDB

};