// import {  Router } from "express";

// import { AuthController,  } from "./auth.controller";

// import { Role } from "../../../generated/prisma/client";
// import { auth } from "../../middlewares/auth";

//  const router = Router();

//  router.post("/register",AuthController.RegisterUser);
  
//  router.post("/login", AuthController.loginUser);


// router.get("/me", auth(Role.Admin,Role.Customer,Role.Technician) ,AuthController.getMe)

// router.put("/updateProfile", auth(Role.Admin,Role.Customer,Role.Technician), AuthController.updatedProfile);


//  export const  userRoutes=router;




import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();



router.post(
"/register",
AuthController.RegisterUser
);



router.post(
"/login",
AuthController.loginUser
);



router.get(

"/me",

auth(
Role.Admin,
Role.Customer,
Role.Technician
),

AuthController.getMe

);




router.put(

"/updateProfile",

auth(
Role.Admin,
Role.Customer,
Role.Technician
),

AuthController.updatedProfile

);



export const userRoutes = router;