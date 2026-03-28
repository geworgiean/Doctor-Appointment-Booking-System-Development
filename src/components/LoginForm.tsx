"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getUserRole } from "@/actions/login";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const role = await getUserRole(email);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Սխալ էլ. հասցե կամ գաղտնաբառ");
            setLoading(false);
        } else {
            if (role === "DOCTOR") {
                router.push("/dashboard/doctor");
            }   else if (role === "ADMIN") {
                router.push("/dashboard/admin");
            }   else {
                router.push("/dashboard/patient");
            }

            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="p-3 bg-red-50 text-red-600 text0sm rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Էլ. հասցե</label>
                <input 
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"                
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Գաղտնաբառ</label>
                <input 
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
            >
                {loading ? "Մուտք..." : "Մուտք գործել"}
            </button>
        </form>
    )
}