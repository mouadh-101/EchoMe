"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, ArrowLeft, Mail } from "lucide-react"
import { useRouter } from 'next/navigation'
import { authService, UserData, BackendResponse } from '../services/authService'
import { EchoAlert } from "@/components/ui/echo-alert"
export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const [showAlert, setShowAlert] = useState<{
    show: boolean
    type: "success" | "error" | "info" | "warning"
    message: string
    subMessage?: string
  }>({ show: false, type: "success", message: "" })

  const showAlertMessage = (type: "success" | "error" | "info" | "warning", message: string, subMessage?: string) => {
    setShowAlert({ show: true, type, message, subMessage })
    setTimeout(() => {
      setShowAlert({ show: false, type: "success", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        await authService.login(formData.email, formData.password)
        showAlertMessage("success", "Login successful", "Welcome back!")
      } else {
        await authService.register(formData)
        showAlertMessage("success", "Registration successful", "Welcome aboard!")
      }
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
      console.error("Authentication error:", err)
      showAlertMessage("error", "Authentication failed", err.message )
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0E0E0E] text-[#F4EBDC] p-4">
      <div className="w-full max-w-md mx-auto">
        <Link href="/" className="flex items-center text-[#F4EBDC]/70 hover:text-[#F4EBDC] mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {showAlert.show && (
            <EchoAlert
              type={showAlert.type}
              message={showAlert.message}
              subMessage={showAlert.subMessage}
              dismissible={true}
              onDismiss={() => setShowAlert({ show: false, type: "success", message: "" })}
            />
          )}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-[#F4EBDC]/70">Sign in to access your audio memories</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#0E0E0E] rounded-2xl mb-8 p-1">
              <TabsTrigger
                value="signin"
                className="rounded-xl data-[state=active]:bg-[#1FB2A6] data-[state=active]:text-[#0E0E0E] transition-all duration-300"
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-xl data-[state=active]:bg-[#1FB2A6] data-[state=active]:text-[#0E0E0E] transition-all duration-300"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-0 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="bg-[#0E0E0E] border-[#333333] rounded-2xl py-6 pl-4 text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6] transition-all"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-[#0E0E0E] border-[#333333] rounded-2xl py-6 pl-4 text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6] transition-all"
                  />
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#F4EBDC]/70 hover:text-[#1FB2A6] block text-right transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                className="w-full py-6 bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E] font-medium rounded-2xl shadow-[0_0_15px_rgba(31,178,166,0.5)] hover:shadow-[0_0_25px_rgba(31,178,166,0.7)] transition-all duration-300"
                onClick={handleSubmit}
              >
                Sign In
              </Button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-[#333333]"></div>
                <span className="flex-shrink mx-4 text-[#F4EBDC]/50 text-sm">or continue with</span>
                <div className="flex-grow border-t border-[#333333]"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="py-5 rounded-2xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                >
                  <Apple className="mr-2 h-5 w-5" />
                  Apple
                </Button>
                <Button
                  variant="outline"
                  className="py-5 rounded-2xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="mt-0 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="bg-[#0E0E0E] border-[#333333] rounded-2xl py-6 pl-4 text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6] transition-all"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="bg-[#0E0E0E] border-[#333333] rounded-2xl py-6 pl-4 text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6] transition-all"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-[#0E0E0E] border-[#333333] rounded-2xl py-6 pl-4 text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6] transition-all"
                  />
                </div>
              </div>

              <Button
                className="w-full py-6 bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E] font-medium rounded-2xl shadow-[0_0_15px_rgba(31,178,166,0.5)] hover:shadow-[0_0_25px_rgba(31,178,166,0.7)] transition-all duration-300"
                onClick={handleSubmit}
              >
                Create Account
              </Button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-[#333333]"></div>
                <span className="flex-shrink mx-4 text-[#F4EBDC]/50 text-sm">or continue with</span>
                <div className="flex-grow border-t border-[#333333]"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="py-5 rounded-2xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                >
                  <Apple className="mr-2 h-5 w-5" />
                  Apple
                </Button>
                <Button
                  variant="outline"
                  className="py-5 rounded-2xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
