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


const deleteUserFromDB = async(
id:string
)=>{

const user =
await prisma.user.findUniqueOrThrow({

where:{
 id
}

});


await prisma.$transaction(async(tx)=>{

if(user.role === "Technician"){

const technician =
await tx.technicianProfile.findUnique({

where:{
 userId:id
}

});


if(technician){

const technicianBookings =
await tx.booking.findMany({

where:{
 technician_id:technician.id
},

select:{
 id:true
}

});

const bookingIds =
technicianBookings.map(b => b.id);

await tx.payment.deleteMany({

where:{
 booking_id:{
  in:bookingIds
 }
}

});

await tx.review.deleteMany({

where:{
 OR:[
  {
   booking_id:{
    in:bookingIds
   }
  },
  {
   technician_id:technician.id
  }
 ]
}

});

await tx.booking.deleteMany({

where:{
 technician_id:technician.id
}

});

await tx.service.deleteMany({

where:{
 technician_id:technician.id
}

});

await tx.availability.deleteMany({

where:{
 technician_id:technician.id
}

});

await tx.technicianProfile.delete({

where:{
 id:technician.id
}

});

}

}

const customerBookings =
await tx.booking.findMany({

where:{
 customer_id:id
},

select:{
 id:true
}

});

const customerBookingIds =
customerBookings.map(b => b.id);

if(customerBookingIds.length > 0){

await tx.payment.deleteMany({

where:{
 booking_id:{
  in:customerBookingIds
 }
}

});

await tx.review.deleteMany({

where:{
 booking_id:{
  in:customerBookingIds
 }
}

});

await tx.booking.deleteMany({

where:{
 customer_id:id
}

});

}

await tx.review.deleteMany({

where:{
 customer_id:id
}

});

await tx.user.delete({

where:{
 id
}

});

});


return null;


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

deleteUserFromDB,

getAllBookingsFromDB,

getAllCategoriesFromDB,

createCategoryIntoDB


};
