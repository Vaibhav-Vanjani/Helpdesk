"use client";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import createOrganisation from '@/app/api/admin/organisation/Organinsation';

export default function(){
    const [organistionFormData,SetOrganistionFormData] = useState({"organisationName":""});

    function OrganisationFormChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        SetOrganistionFormData(prev=>({...prev,[name]:value}));
    }

    async function OrganisationFormSubmitHandler(e:React.FormEvent){
        e.preventDefault();
        console.log(organistionFormData,"Inside OrganisationFormSubmitHandler");
        try {
            const response = await createOrganisation(organistionFormData);
            if(response.status){
                alert("Successfully Created Organisation");
            }
            else{
                alert("Failure -"+response.message);
            }
        } catch (error) {
            alert("Internal Server Error");
        }      
    }

    return (<>
        <BackButton/>
        <form onSubmit={OrganisationFormSubmitHandler}>
            <input type="text" 
                   name="organisationName"
                   placeholder="Organisation Name"
                   onChange={OrganisationFormChangeHandler}
                   value={organistionFormData["organisationName"]}
            ></input>
            <button type="submit">Submit</button>
        </form>
    </>)
}