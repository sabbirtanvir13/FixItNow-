import {  Router } from "express";

import { AuthController,  } from "./auth.controller";
 const router = Router();

 router.post("/register",AuthController.RegisterUser);
  
 router.post("/login", AuthController.loginUser);

router.get("/me", AuthController.getMe);


 export const  userRoutes=router;