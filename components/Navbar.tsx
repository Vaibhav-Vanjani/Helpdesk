"use client";

import { useRouter } from "next/navigation";

export default function(){
    const router = useRouter();
    return <>
        <nav>
            <ul>
                <li>_Helpdesk</li>
            </ul>
            <ul>
                <li onClick={()=>{router.push('/signup')}}>
                    Signup
                </li>
                  <li onClick={()=>{router.push('/login')}}>
                    Login
                </li>
            </ul>
        </nav>
    </>
}