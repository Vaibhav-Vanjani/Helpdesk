"use server";

import {prisma} from '@/config/Db';

type UserType = "admin" | "client" | "developer";

interface Signup{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    userType:UserType,
}

export default async function({firstName,lastName,email,password,userType}:Signup){ 
   try {
        const response = await prisma.user.create({
            data:{
                firstName,lastName,email,password,userType
            }
         });

        return {
            success:true,
            data:response,
            status:200
        }

   } catch (error) {
        console.log(error,"Inside Signup Fn");
        return {
            success:false,
            message:"Something went wrong while signging up !!",
            status:500
        }
   }
}