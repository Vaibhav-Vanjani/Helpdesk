"use server";
import {prisma} from '@/config/Db';

interface ManagerGroup{
    managerName:string,
    managerId:string,
}

export async function getManager(req:ManagerGroup){
    try {
        const response = await prisma.userMapping.findMany({
          where:{
            
          }
        })
    } catch (error) {
        
    }
}