"use server";
import {prisma} from '@/config/Db';

const NEW_MANAGER_ID="newManagerId";
const MANAGER="manager";

interface ProjectForm{
    organisationName:string,
    projectName:string,
    assignTo?:String,
    managerId:string,
}

export async function getManager(){
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

export async function createProject(req:ProjectForm) {
  try {
        if(NEW_MANAGER_ID === req.assignTo){
            await prisma.userIdMapping.create({
                data:{
                    invitationId:req.managerId,
                    projectName:req.projectName,
                    role:MANAGER,
                }
            })
        }
        else{
            await prisma.userMapping.create({
                data:{
                    organisationName:req.organisationName,
                    projectName:req.projectName,
                    userId:req.managerId
                }
            })
        }

        delete req.assignTo;
        
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