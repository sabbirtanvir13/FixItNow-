import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { ICreateService, IUpdateService } from "./service.interface";

class AppError extends Error {
  statusCode: number;

  constructor(
    statusCode: number,
    message: string
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}





// Create Service

const createServiceIntoDB =
async(

userId:string,

payload:ICreateService

)=>{


const technician =
await prisma.technicianProfile.findUniqueOrThrow({

where:{
userId
}

});




const service =
await prisma.service.create({

data:{


technician_id:technician.id,


category_id:payload.category_id,


title:payload.title,


description:payload.description,
image: payload.image,

price:payload.price,


duration:payload.duration,


location:payload.location


}


});



return service;


};









// Get All Service With Filter


const getAllServicesFromDB =
async(

query:any

)=>{


const {


search,

category,

location,

minPrice,

maxPrice


}=query;







const services =
await prisma.service.findMany({

where:{





OR: search
?
[

{

title:{

contains:search,

mode:"insensitive"

}

},



{

description:{

contains:search,

mode:"insensitive"

}

}


]

:

undefined,







category: category
?

{

name:{

contains:category,

mode:"insensitive"

}

}

:

undefined,









location: location
?

{

contains:location,

mode:"insensitive"

}

:

undefined,









price:{


gte:minPrice
?

Number(minPrice)

:

undefined,



lte:maxPrice
?

Number(maxPrice)

:

undefined


}






},






include:{


category:true,



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



}



},





orderBy:{


created_at:"desc"


}



});





return services;


};









// Get Single Service


const getSingleServiceFromDB =
async(

id:string

)=>{



const service =
await prisma.service.findUniqueOrThrow({

where:{

id

},



include:{


category:true,



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



}



}



});



return service;


};



const getMyServicesFromDB = async (userId: string) => {
  const technician =
    await prisma.technicianProfile.findUniqueOrThrow({
      where: {
        userId,
      },
    });

  return prisma.service.findMany({
    where: {
      technician_id: technician.id,
    },

    include: {
      category: true,
    },

    orderBy: {
      created_at: "desc",
    },
  });
};

const updateServiceIntoDB = async (
  userId: string,
  serviceId: string,
  payload: IUpdateService
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Technician profile not found"
    );
  }

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      technician_id: technician.id,
    },
  });

  if (!service) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Service not found or you don't have permission"
    );
  }

  return prisma.service.update({
    where: {
      id: service.id,
    },
    data: payload,
  });
};


const deleteServiceFromDB = async (
  userId: string,
  serviceId: string
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Technician profile not found"
    );
  }

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      technician_id: technician.id,
    },
  });

  if (!service) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Service not found or you don't have permission"
    );
  }

  return prisma.service.delete({
    where: {
      id: serviceId,
    },
  });
};

export const ServiceService={


createServiceIntoDB,

getAllServicesFromDB,

getSingleServiceFromDB,
getMyServicesFromDB,
updateServiceIntoDB,
deleteServiceFromDB
};