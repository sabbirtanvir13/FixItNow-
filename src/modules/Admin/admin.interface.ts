export interface IUpdateUserStatus {

  active_status: "Active" | "Blocked";

}


export interface ICreateCategory {

  name:string;

  description?:string;

}