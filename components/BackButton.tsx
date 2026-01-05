"use client";

import { useRouter } from "next/navigation";

export default function(){
    const router = useRouter();
    return (
  <>
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300
                 px-4 py-2 text-sm font-medium text-gray-700
                 hover:bg-gray-100 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      ← Back
    </button>
  </>
);

}