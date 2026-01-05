"use client";

import { useRouter } from "next/navigation";

export default function(){
    const router = useRouter();
   return (
  <>
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <ul>
        <li className="cursor-pointer text-xl font-semibold text-blue-600">
          _Helpdesk
        </li>
      </ul>
      <ul className="flex items-center gap-6">
        <li
          onClick={() => router.push("/signup")}
          className="cursor-pointer text-sm font-medium text-gray-700
                     hover:text-blue-600 transition-colors"
        >
          Signup
        </li>

        <li
          onClick={() => router.push("/login")}
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2
                     text-sm font-medium text-white hover:bg-blue-700
                     transition-colors"
        >
          Login
        </li>
      </ul>
    </nav>
  </>
);
}