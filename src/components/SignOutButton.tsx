"use client"

import { signOut } from "next-auth/react"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors group"
        >
            <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6 text-red-400 group-hover:text-red-600" />
            Դուրս գալ    
        </button>
    );
}