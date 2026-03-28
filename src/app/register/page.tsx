"use client"

import { registerUser } from "../../actions/auth"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function clientAction(formData: FormData) {
    setError("")
    
    startTransition(async () => {
      const res = await registerUser(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        router.push("/login")
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form action={clientAction} className="p-8 border rounded-xl shadow-lg w-96 bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Գրանցում</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        
        <input name="name" placeholder="Անուն" className="w-full p-2 border rounded mb-3" required />
        <input name="email" type="email" placeholder="Էլ. փոստ" className="w-full p-2 border rounded mb-3" required />
        <input name="password" type="password" placeholder="Գաղտնաբառ" className="w-full p-2 border rounded mb-3" required />
        
        <select name="role" className="w-full p-2 border rounded mb-6">
          <option value="PATIENT">Պացիենտ</option>
          <option value="DOCTOR">Բժիշկ</option>
        </select>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Գրանցվում է..." : "Գրանցվել"}
        </button>
      </form>
    </div>
  )
}