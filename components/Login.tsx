"use client";

import login from "@/app/api/user/Login";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Login{
    email:string,
    password:string,
}

const INTIAL_login:Login={
    email:"",
    password:""
}

export default function(){
    const [loginFormData,setloginFormData] = useState<Login>(INTIAL_login);
    const router = useRouter();
    
    function loginFormChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        setloginFormData(prev=>({...prev,[name]:value}));
    }

    async function loginFormSubmitHandler(e:React.FormEvent){
        e.preventDefault();
        console.log(loginFormData);
         const response = await login(loginFormData);
         if(response.success){
            const userType = response?.data?.userType;
            router.push('/'+userType);
        }
        else{
                alert('Failure');
        }
    }

  return (
  <>
  <section className="fixed top-1/3 left-1/8 md:left-1/6 lg:left-1/3">
    <form
      onSubmit={loginFormSubmitHandler}
      className="m-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Welcome Back
      </h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={loginFormData.email}
        onChange={loginFormChangeHandler}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginFormData.password}
        onChange={loginFormChangeHandler}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-2 font-medium text-white
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Login
      </button>
    </form>
  </section>
  </>
);

}