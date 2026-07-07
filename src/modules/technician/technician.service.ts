import { prisma } from "../../lib/prisma";
import { UpdateTechnicianProfilePayload } from "./technician.interface";




const updateTechnicianProfileIntoDB = async (
  userId: string,
  payload: UpdateTechnicianProfilePayload
) => {


  const technicianProfile =
    await prisma.technicianProfile.findUnique({
      where:{
        userId
      }
    });



  if(!technicianProfile){
    throw new Error(
      "Technician profile not found"
    );
  }



  const updatedProfile =
    await prisma.technicianProfile.update({

      where:{
        userId
      },


      data:{
        profilePhoto: payload.profilePhoto,
        bio: payload.bio,
        experience_years: payload.experience_years,
        skills: payload.skills,
        location: payload.location,
        hourly_rate: payload.hourly_rate
      }

    });



  return updatedProfile;

};





const getTechnicianProfileFromDB = async(
 userId:string
)=>{


const profile =
 await prisma.technicianProfile.findUniqueOrThrow({

 where:{
  userId
 },


 include:{
  user:{
    select:{
      id:true,
      name:true,
      email:true,
      role:true
    }
  }
 }


 });



return profile;


};




export const TechnicianService={

 updateTechnicianProfileIntoDB,

 getTechnicianProfileFromDB

};