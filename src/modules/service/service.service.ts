import { prisma } from "../../lib/prisma";
import { ICreateService } from "./service.interface";


const createServiceIntoDB = async (
  userId: string,
  payload: ICreateService
) => {


  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where:{
      userId
    }
  });



  const service = await prisma.service.create({

    data:{
      technician_id: technician.id,

      category_id: payload.category_id,

      title: payload.title,

      description: payload.description,

      price: payload.price,

      duration: payload.duration,

      location: payload.location
    }

  });



  return service;

};




const getAllServicesFromDB = async () => {

  const services = await prisma.service.findMany({

    include: {
      category: true,

      technician: {
        include: {
          user: {
            omit: {
              password:true
            }
          }
        }
      }
    },

    orderBy:{
      created_at:"desc"
    }

  });


  return services;
};




const getSingleServiceFromDB = async(id:string)=>{


const service = await prisma.service.findUniqueOrThrow({

where:{
 id
},


include:{
 category:true,

 technician:{
  include:{
   user:{
    omit:{
     password:true
    }
   }
  }
 }

}


});


return service;

};




export const ServiceService={

createServiceIntoDB,

getAllServicesFromDB,

getSingleServiceFromDB

};