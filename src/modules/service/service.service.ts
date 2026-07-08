import { prisma } from "../../lib/prisma";
import { ICreateService } from "./service.interface";





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








export const ServiceService={


createServiceIntoDB,

getAllServicesFromDB,

getSingleServiceFromDB


};