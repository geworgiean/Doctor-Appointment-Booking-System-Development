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
        setLoading(true);
        setLoading(false);
    
    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result?.success) {
      router.push("/login");
    } else if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <label className="block text-sm font-medium text-gray-700">Անուն Ազգանուն</label>
                <input 
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="Հովհաննես Հովհաննիսյան"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Էլ. հասցե</label>
                <input 
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="example@mail.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Գաղտնաբառ</label>
                <input 
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            <input type="hidden" name="role" value={defaultRole} />

            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 font-medium">
                Դուք գրանցվում եք որպես: <span className="uppercase">{defaultRole === 'DOCTOR' ? 'Բժիշկ' : 'Պացիենտ'}</span>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 p-3 rounded-xl text-white font-bold"
            >
                {loading ? "Գրանցվում է..." : "Ստեղծել հաշիվ"}
            </button> 
        </form>
    );
}