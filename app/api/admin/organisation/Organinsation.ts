"use server";
import {prisma} from '@/config/Db';

interface Organisation{
    organisationName:string,
}

export default async function({organisationName}:Organisation){
    try {
        const response = await prisma.organisation.create({
            data:{
                organisationName
            }
        })
        return {
            status:true,
            data:response,
        }
    } catch (error) {
        return {
            status:false,
            message:"Something went wrong while creating organisation !!",
        }
    }
}

export async function getOrganisation(){
    try {
        const response = await prisma.organisation.findMany({
            where:{
                isActive:true
            }
        })
        return {
            status:true,
            data:response,
        }
    } catch (error) {
        return {
            status:false,
            message:"Something went wrong while creating organisation !!",
        }
    }
}