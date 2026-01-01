"use client";
import { useState } from "react";

interface ProjectForm{
    projectName:string,
    assignTo:String,
    createdManagerId:string,
}

interface ManagerGroup{
    managerName:string,
    managerId:string,
}

export default function(){
    const [projectFormData,SetprojectFormData] = useState<Partial<ProjectForm>>({});
    const [managerGroup,setManagerGroup] = useState<Partial<ManagerGroup[]>>([]);

    function ProjectFormChangeHandler(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name,value} = e.target;
        SetprojectFormData(prev=>({...prev,[name]:value}));

        if(value === 'oldManagerId' && managerGroup.length===0){
            // API call to set managerGroup with all present manager
        }
    }

    function ProjectFormSubmitHandler(e:React.FormEvent){
        e.preventDefault();
        console.log(projectFormData,"Inside OrganisationFormSubmitHandler");
    }

    function createManagerIdHandler(){
        const allCharString = "QWERTYUIOPASDFGHJKLZXCVBNM123456789!@#$%^&*"
        let managerId ="";
        for(let i=0;i<8;i++){
            managerId+=allCharString[Math.floor(Math.random()*allCharString.length)]
        }
        SetprojectFormData(prev=>({...prev,"createdManagerId":managerId}));
    }

    return (<>
        <form onSubmit={ProjectFormSubmitHandler}>
            <input type="text" 
                   name="projectName"
                   placeholder="Project Name"
                   onChange={ProjectFormChangeHandler}
                   value={projectFormData["projectName"]}
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
                    <select onChange={ProjectFormChangeHandler}>
                        {managerGroup.map((manager)=>{
                            return <option key={manager?.managerId} value={manager?.managerName}>{manager?.managerName}</option>
                        })}
                    </select>
                </>)
                :
                (<>
                    <input type="text"
                           readOnly
                           value={projectFormData.createdManagerId ?? ""}></input>
                    <button onClick={createManagerIdHandler}>Create Manager ID</button>
                </>)
            }
            
            <button type="submit">Submit</button>
        </form>
    </>)
}