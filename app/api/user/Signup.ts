"use server";

import {prisma} from '@/config/Db';

type UserType = "admin" | "client" | "developer";

interface Signup{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    userType:UserType,
    userId?:string,
}

export default async function(req:Signup){ 
   try {

        if(req?.userId){
            const checkIfUserIdExist = await prisma.user.findFirst({
                where:{
                    userId:req.userId
                }
            });

            if(!checkIfUserIdExist){
                return {
                    success:false,
                    message:"Invitation ID does not exist!",
                }
            }
        }

        const response = await prisma.user.create({
            data:{
                ...req
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