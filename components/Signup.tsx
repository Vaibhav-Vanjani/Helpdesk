"use client";

import Signup from "@/app/api/user/Signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserType = "admin" | "client" | "developer" | "manager";

interface Signup{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    userType:UserType,
    userId?:string
}

const INTIAL_SIGNUP:Signup={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    userType:"developer",
    userId:""
}

export default function(){
    const [signupFormData,setSignupFormData] = useState<Signup>(INTIAL_SIGNUP);
    const router = useRouter();
    
    function signupFormChangeHandler(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name,value} = e.target;
        setSignupFormData(prev=>({...prev,[name]:value}));
    }

    async function signupFormSubmitHandler(e:React.FormEvent){
        e.preventDefault();
        console.log(signupFormData);
       const response = await Signup(signupFormData);
       if(response.success){
           const userType = response?.data?.userType;
           router.push('/'+userType);
       }
       else{
            alert('Something went wrong!');
       }
    }

    return (
  <>
   <section className="fixed top-1/4 left-1/8 md:left-1/6 lg:left-1/3">
    <form
      onSubmit={signupFormSubmitHandler}
      className="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Create Account
      </h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={signupFormData.firstName}
        onChange={signupFormChangeHandler}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={signupFormData.lastName}
        onChange={signupFormChangeHandler}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <select
        name="userType"
        value={signupFormData.userType}
        onChange={signupFormChangeHandler}
        required
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="admin">Admin</option>
        <option value="client">Client</option>
        <option value="developer">Developer</option>
        <option value="manager">Manager</option>
      </select>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signupFormData.email}
        onChange={signupFormChangeHandler}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signupFormData.password}
        onChange={signupFormChangeHandler}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <input
        type="text"
        name="userId"
        placeholder="Invitation ID (optional)"
        value={signupFormData.userId}
        onChange={signupFormChangeHandler}
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-2 text-white font-medium
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Sign Up
      </button>
    </form>
    </section>
  </>
);

}