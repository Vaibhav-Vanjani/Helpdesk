"use server";
import {prisma} from '@/config/Db';

interface ManagerGroup{
    managerName:string,
    managerId:string,
}

interface ProjectForm{
    organisationName:string,
    projectName:string,
    assignTo:String,
    managerId:string,
}

export async function getManager(){
    console.log("Inside getManager2");
    try {
        const response = await prisma.user.findMany({
          where:{
            isActive:true,
            userType:"manager"
          }
        })

        return {
            success:true,
            data:response,
        }
    } catch (error) {
        console.log(error,"Inside getManager Catch fn");
        return {
            success:false,
            message:"Something went wrong!",
        }
    }
}

export async function createProject(req:Omit<ProjectForm,"assignTo">) {
  try {
        const response = await prisma.project.create({
            data:{
                  ...req
            }
        })
        return {
            success:true,
            data:response,
        }
  } catch (error) {
        console.log(error);
        return {
            success:false,
            message:"Something went wrong!",
        }
  }
}