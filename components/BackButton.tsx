"use client";

import { useRouter } from "next/navigation";

export default function(){
    const router = useRouter();
    return <>
        <button onClick={()=>router.back()}>Back</button>
    </>
}