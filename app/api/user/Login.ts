"use server";

import {prisma} from '@/config/Db';
import { NextResponse } from 'next/server';

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
              return NextResponse.json({
                    data:"User Not Found",
                },{
                    status:401
              })
        } 

        return NextResponse.json({
            data:response,
        },{
            status:200
        })

   } catch (error) {
        console.log(error,"Inside Login Fn");
        return NextResponse.json({
            message:"Something went wrong while Login !!",
        },{
            status:500
        })
   }
}