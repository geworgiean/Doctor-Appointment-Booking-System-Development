"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      alert("Սխալ տվյալներ")
    } else {
      router.push("/dashboard/doctor")
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded-xl shadow-lg w-96 bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Մուտք</h1>
        <input name="email" type="email" placeholder="Էլ. փոստ" className="w-full p-2 border rounded mb-3" required />
        <input name="password" type="password" placeholder="Գաղտնաբառ" className="w-full p-2 border rounded mb-6" required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
          Մուտք գործել
        </button>
      </form>
    </div>
  )
}