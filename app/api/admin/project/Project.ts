"use server";
import {prisma} from '@/config/Db';

interface ManagerGroup{
    managerName:string,
    managerId:string,
}

export async function createManager(req:ManagerGroup){
    try {
        // const response = await prisma.user.create({
        //     data:{
                
        //     }
        // })
    } catch (error) {
        
    }
}