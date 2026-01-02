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

    return <>
        <form onSubmit={loginFormSubmitHandler}>
            <input type="email" 
                   placeholder="Email"
                   name="email"
                   onChange={loginFormChangeHandler}
                   value={loginFormData.email}
                   required
            ></input>
            <input type="password" 
                   placeholder="Password"
                   name="password"
                   onChange={loginFormChangeHandler}
                   value={loginFormData.password}
                   required
            ></input>
            <button>Login</button>
        </form>
    </>
}