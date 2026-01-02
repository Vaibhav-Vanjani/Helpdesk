"use client";
import { useRouter } from "next/navigation";

const adminBtn = [
    {
        id:1,
        btnName:"Create Organistaion",
        routeTo:"/admin/organisation"
    },
    {
        id:2,
        btnName:"Create Project",
        routeTo:"/admin/project"
    },   
]

export default function(){
    const route = useRouter();
    return (<>
    {
        adminBtn.map((btn)=>{
            return <button key={btn.id} onClick={()=>route.push(btn.routeTo)}>{btn.btnName}</button>
        })
    }
    </>)
}