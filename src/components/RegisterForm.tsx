"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { registerUser } from "@/actions/auth";
import { useState } from "react"

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const defaultRole = searchParams.get("role") || "PATIENT";
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(""); 
        setLoading(true);
    
        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await registerUser(formData);

            if (result?.success) {
                router.push("/login?success=Account created");
            } else if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
        } catch (err) {
            setError("Տեղի է ունեցել անսպասելի սխալ:");
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Անուն Ազգանուն</label>
                <input 
                    name="name"
                    type="text"
                    required
                    disabled={loading}
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-50"
                    placeholder="Հովհաննես Հովհաննիսյան"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Էլ. հասցե</label>
                <input 
                    name="email"
                    type="email"
                    required
                    disabled={loading}
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-50"
                    placeholder="example@mail.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Գաղտնաբառ</label>
                <input 
                    name="password"
                    type="password"
                    required
                    disabled={loading}
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-50"
                    placeholder="••••••••"
                />
            </div>

            <input type="hidden" name="role" value={defaultRole} />

            <div className="p-3 bg-blue-50 rounded-xl text-sm text-blue-700 font-medium border border-blue-100">
                Դուք գրանցվում եք որպես: <span className="font-bold underline text-blue-800">{defaultRole === 'DOCTOR' ? 'Բժիշկ' : 'Պացիենտ'}</span>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className={`w-full p-3 rounded-xl text-white font-bold transition-all ${
                    loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
                }`}
            >
                {loading ? "Գրանցվում է..." : "Ստեղծել հաշիվ"}
            </button> 
        </form>
    );
}