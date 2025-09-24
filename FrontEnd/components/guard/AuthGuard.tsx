"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isAuthenticated } from "@/app/utils/auth"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth") 
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) {
    return <p className="text-center mt-10 text-gray-400">Checking authentication...</p>
  }

  return <>{children}</>
}
