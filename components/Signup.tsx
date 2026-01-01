"use client";

import Signup from "@/app/api/user/Signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserType = "admin" | "client" | "developer";

interface Signup{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    userType:UserType,
}

const INTIAL_SIGNUP:Signup={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    userType:"developer"
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
           router.replace('/'+userType);
       }
       else{
            alert('Failure');
       }
    }

    return <>
        <form onSubmit={signupFormSubmitHandler}>
            <input type="text" 
                   placeholder="First Name"
                   name="firstName"
                   onChange={signupFormChangeHandler}
                   value={signupFormData.firstName}
                   required
            ></input>
            <input type="text" 
                   placeholder="Last Name"
                   name="lastName"
                   onChange={signupFormChangeHandler}
                   value={signupFormData.lastName}
                   required
            ></input>
            <select name="userType"
                   onChange={signupFormChangeHandler}
                   value={signupFormData.userType}
                   required>
                <option value={"admin"}>Admin</option>
                <option value={"client"}>Client</option>
                <option value={"developer"}>Developer</option>
            </select>
            <input type="email" 
                   placeholder="Email"
                   name="email"
                   onChange={signupFormChangeHandler}
                   value={signupFormData.email}
                   required
            ></input>
            <input type="password" 
                   placeholder="Password"
                   name="password"
                   onChange={signupFormChangeHandler}
                   value={signupFormData.password}
                   required
            ></input>
            <button>Sign Up</button>
        </form>
    </>
}