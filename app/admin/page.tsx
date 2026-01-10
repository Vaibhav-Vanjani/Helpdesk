"use client";
import { useRouter } from "next/navigation";

const adminBtnList = [
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

const AdminButtons = ({ adminBtn = adminBtnList }) => {
  const route = useRouter();

  return (
    <div className="flex flex-wrap gap-4">
      {adminBtn.map((btn) => (
        <button
          key={btn.id}
          onClick={() => route.push(btn.routeTo)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium 
                     hover:bg-blue-700 transition duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {btn.btnName}
        </button>
      ))}
    </div>
  );
};

export default AdminButtons;
