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

   return (
  <>
    <BackButton />

    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-md rounded-xl">
      <form
        onSubmit={OrganisationFormSubmitHandler}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="organisationName"
          placeholder="Organisation Name"
          onChange={OrganisationFormChangeHandler}
          value={organistionFormData["organisationName"]}
          className="border border-gray-300 rounded-lg px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg 
                     hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  </>
);
}