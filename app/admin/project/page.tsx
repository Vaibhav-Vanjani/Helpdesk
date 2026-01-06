"use client";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { getOrganisation } from "@/app/api/admin/organisation/Organinsation";
import { createProject, getManager } from "@/app/api/admin/project/Project";

// Constants
const OLD_MANAGER_ID = "oldManagerId"; 
const ALL_CHAR_STRINGS = "QWERTYUIOPASDFGHJKLZXCVBNM123456789!@#$%^&*";

// types 
interface ProjectForm{
    organisationName:string,
    projectName:string,
    assignTo:String,
    managerId:string,
}

interface ManagerGroup{
    managerName:string,
    managerId:string,
}

interface OrganisationGroup{
    id: number,
    organisationName: string,
    isActive: boolean,
}

export default function(){
    const [projectFormData,SetprojectFormData] = useState<Partial<ProjectForm>>({});
    const [managerGroup,setManagerGroup] = useState<Partial<ManagerGroup[]>>([]);
    const [organisationGroup,setOrganisationGroup] = useState<Partial<OrganisationGroup[]>>([]);

   async function ProjectFormChangeHandler(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
     console.log("Inside ProjectFormChangeHandler !!");
        const {name,value} = e.target;
        SetprojectFormData(prev=>({...prev,[name]:value}));

        if(name === "assignTo" && value === 'oldManagerId' && managerGroup.length===0){
            // API call to get managerGroup with all present manager
            console.log("Inside getManager !!");
            await getManager().then((data)=>{
                if(!data.success){
                    setManagerGroup([]);
                    return ;
                }
                const managerAdapter = (data?.data ?? []).map(manager => ({
                    managerName: `${manager.firstName} ${manager.lastName}`,
                    managerId: ""
                }));

                setManagerGroup(managerAdapter);
            });
        }
    }

    async function ProjectFormSubmitHandler(e:React.FormEvent){
        e.preventDefault();
        const submitter = (e.nativeEvent as SubmitEvent)
            .submitter as HTMLButtonElement;

        if (submitter.name !== "formSubmit") {
            return;
        }

        console.log(projectFormData,"Inside OrganisationFormSubmitHandler");
        if(!projectFormData?.assignTo ||
           !projectFormData?.managerId ||
           !projectFormData?.organisationName ||
           !projectFormData?.projectName){
            alert("please fill all required fields !!");
            return;
        }
       const response = await createProject(projectFormData as ProjectForm);
       if(!response?.success){
        alert("Something Went Wrong!");
        return;
       }

       alert("Successfully Created Project");
       SetprojectFormData({});
    }

    function createManagerIdHandler(){
        const allCharString = ALL_CHAR_STRINGS;
        let managerId ="";
        for(let i=0;i<8;i++){
            managerId+=allCharString[Math.floor(Math.random()*allCharString.length)]
        }
        SetprojectFormData(prev=>({...prev,"managerId":managerId}));
    }

    async function getActiveOrganisation(){
        // Api Call and set organisation and change state
        console.log("Inside active organisation");
        try {
             const response = await getOrganisation();
             if(response.status){
                setOrganisationGroup(response.data ?? []);
             }
        } catch (error) {
            alert("Something went wrong while fetching Organisation");
        }
    }

    return (<>
        <BackButton/>
        <form onSubmit={ProjectFormSubmitHandler}>
           { organisationGroup.length>0 ? 
             (
                <select name="organisationName" onChange={ProjectFormChangeHandler}>
                <>
                    <option value={"Select"}>{"Select"}</option>
                    {
                        organisationGroup.map((organisation)=>{
                            return <option key={organisation?.id} value={organisation?.organisationName}>{organisation?.organisationName}</option>
                        })
                    }
                </>
                </select>
            )
                :
             (
             <select onClick={getActiveOrganisation}>
                <option value={"Select"}>{"Select"}</option>
             </select>
             )
           }
            
            <input type="text" 
                   name="projectName"
                   placeholder="Project Name"
                   onChange={ProjectFormChangeHandler}
                   value={projectFormData["projectName"] ?? ""}
            ></input>
            <label htmlFor="newManagerId">Generate New Manager Id</label>
            <input type="radio" 
                   name="assignTo"
                   onChange={ProjectFormChangeHandler}
                   value={"newManagerId"}
                   checked={projectFormData.assignTo === 'newManagerId'}
                   id="newManagerId"
            ></input>

             <label htmlFor="oldManagerId">Select from Old Manager Id</label>
             <input type="radio" 
                   name="assignTo"
                   onChange={ProjectFormChangeHandler}
                   value={"oldManagerId"}
                   checked={projectFormData.assignTo === 'oldManagerId'}
                    id="oldManagerId"
            ></input>
           
            {projectFormData.assignTo === 'oldManagerId' ? 
                (<>
                    <select name="managerId" onChange={ProjectFormChangeHandler} value={projectFormData.managerId ?? ""}>
                        <option value={"Select"}>Select</option>
                        {managerGroup.map((manager)=>{
                            return <option key={manager?.managerName} value={manager?.managerName}>{manager?.managerName}</option>
                        })}
                    </select>
                </>)
                :
                (<>
                    <input type="text"
                           readOnly
                           value={projectFormData.managerId ?? ""}></input>
                    <button onClick={createManagerIdHandler}>Create Manager ID</button>
                </>)
            }
            
            <button name="formSubmit" type="submit">Submit</button>
        </form>
    </>)
}