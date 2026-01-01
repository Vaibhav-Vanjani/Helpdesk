"use server";

import {prisma} from '@/config/Db';

interface Login{
    email:string,
    password:string,
}

export default async function({email,password}:Login){ 
   try {
        const response = await prisma.user.findFirst({
            where:{
                email,password
            }
         });

        if(!response){
              return {
                    success:false,
                    message:"User Not Found",
                    status:401
              }
        } 

        return {
            success:true,
            data:response,
            status:200
        }

   } catch (error) {
        console.log(error,"Inside Login Fn");
        return {
            success:false,
            message:"Something went wrong while Login !!",
            status:500
        }
   }
}