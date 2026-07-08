import { prisma } from "../../lib/prisma";
import { ICreateCategory, IUpdateUserStatus } from "./admin.interface";






const getAllUsersFromDB = async()=>{


const users =
await prisma.user.findMany({

omit:{
 password:true
},


orderBy:{
 created_at:"desc"
}

});


return users;

};


const updateUserStatusIntoDB = async(
id:string,
payload:IUpdateUserStatus
)=>{


const user =
await prisma.user.update({

where:{
 id
},


data:{
 active_status:payload.active_status
},


omit:{
 password:true
}


});


return user;


};


const getAllBookingsFromDB = async()=>{


const bookings =
await prisma.booking.findMany({


include:{


customer:{
 select:{
  id:true,
  name:true,
  email:true
 }
},



technician:{

include:{
 user:{
  select:{
   id:true,
   name:true,
   email:true
  }
 }
}

},



service:true


},



orderBy:{
 created_at:"desc"
}


});


return bookings;


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


const createCategoryIntoDB = async(
payload:ICreateCategory
)=>{


const category =
await prisma.category.create({

data:{
 name:payload.name,
 description:payload.description
}

});


return category;


};



export const AdminService={


getAllUsersFromDB,

updateUserStatusIntoDB,

getAllBookingsFromDB,

getAllCategoriesFromDB,

createCategoryIntoDB


};