"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EchoAlert } from "@/components/ui/echo-alert"
import { authService, UserData } from "../services/authService"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "../utils/auth"
import {
  Moon,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Keyboard,
  Download,
  User,
  Mail,
  Edit3,
  Check,
  X,
  Lock,
} from "lucide-react"
import AuthGuard from "@/components/guard/AuthGuard"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Profile editing states
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [profileData, setProfileData] = useState<UserData | null>(null)
  const [tempProfileData, setTempProfileData] = useState(profileData)
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth")
    }
    const fetchUser = async () => {
      try {
        const response = await authService.whoami()
        if (response.status === "success") {
          setProfileData(response.data)
          setTempProfileData(response.data)
        } else {
          console.error("User fetch failed:", response.message)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

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

  const handleProfileSave = async () => {
    try {
      await authService.updateProfile(tempProfileData?.email, tempProfileData?.name)
      await authService.whoami().then((response) => {
        if (response.status === "success") {
          setProfileData(response.data)
          setTempProfileData(response.data)
        }
      })
    } catch (err: any) {
      showAlertMessage("error", "Error updating profile", "Your profile information was not updated.")
    }
    setIsEditingProfile(false)
    showAlertMessage("success", "Profile updated successfully", "Your profile information has been updated.")
  }

  const handleProfileCancel = () => {
    setTempProfileData(profileData)
    setIsEditingProfile(false)
  }

  const handlePasswordSave = async () => {
    if (passwordData.new.length < 8) {
      showAlertMessage("error", "Password too short", "Password must be at least 8 characters long.");
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      showAlertMessage("error", "Passwords don't match", "Please make sure your new passwords match.");
      return;
    }

    try {
      await authService.updatePassword(passwordData.current, passwordData.new); // 
      showAlertMessage("success", "Password changed successfully", "Your password has been updated securely.");
      setPasswordData({ current: "", new: "", confirm: "" });
      setIsEditingPassword(false);
    } catch (err: any) {
      showAlertMessage("error", "Error updating password", err?.message || "Your password was not updated.");
    }
  };

  const handlePasswordCancel = () => {
    setPasswordData({ current: "", new: "", confirm: "" })
    setIsEditingPassword(false)
  }
  const handleLogout = async () => {
    await authService.handleLogout();
  }

  return (
    <AuthGuard>
      <div className="p-6 max-w-4xl mx-auto">
        {showAlert.show && (
          <EchoAlert
            type={showAlert.type}
            message={showAlert.message}
            subMessage={showAlert.subMessage}
            dismissible={true}
            onDismiss={() => setShowAlert({ show: false, type: "success", message: "" })}
          />
        )}

        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-[#F4EBDC]/70">Customize your EchoMe experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="space-y-6">
            <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-medium text-xl">Profile</h2>
                  {!isEditingProfile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditingProfile(true)}
                      className="h-8 w-8 rounded-full hover:bg-[#0E0E0E] text-[#F4EBDC]/70 hover:text-[#1FB2A6]"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#1FB2A6] rounded-full p-4">
                    <User className="h-8 w-8 text-[#0E0E0E]" />
                  </div>
                  <div className="flex-1">
                    {isEditingProfile ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-sm text-[#F4EBDC]/70">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={tempProfileData?.name}
                            onChange={(e) => setTempProfileData(tempProfileData ? { ...tempProfileData, name: e.target.value } : null)}
                            className="bg-[#0E0E0E] border-[#333333] rounded-xl mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm text-[#F4EBDC]/70">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={tempProfileData?.email}
                            onChange={(e) => setTempProfileData(tempProfileData ? { ...tempProfileData, email: e.target.value } : null)}
                            className="bg-[#0E0E0E] border-[#333333] rounded-xl mt-1"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={handleProfileSave}
                            size="sm"
                            className="bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E] rounded-lg"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={handleProfileCancel}
                            variant="outline"
                            size="sm"
                            className="border-[#333333] hover:bg-[#0E0E0E] rounded-lg"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-medium text-lg">{profileData?.name}</h3>
                        <p className="text-[#F4EBDC]/70 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {profileData?.email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Password Section */}
            <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-medium text-xl flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security
                  </h2>
                  {!isEditingPassword && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditingPassword(true)}
                      className="h-8 w-8 rounded-full hover:bg-[#0E0E0E] text-[#F4EBDC]/70 hover:text-[#1FB2A6]"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {isEditingPassword ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password" className="text-sm text-[#F4EBDC]/70">
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        className="bg-[#0E0E0E] border-[#333333] rounded-xl mt-1"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password" className="text-sm text-[#F4EBDC]/70">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        className="bg-[#0E0E0E] border-[#333333] rounded-xl mt-1"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password" className="text-sm text-[#F4EBDC]/70">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        className="bg-[#0E0E0E] border-[#333333] rounded-xl mt-1"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handlePasswordSave}
                        size="sm"
                        className="bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E] rounded-lg"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Update Password
                      </Button>
                      <Button
                        onClick={handlePasswordCancel}
                        variant="outline"
                        size="sm"
                        className="border-[#333333] hover:bg-[#0E0E0E] rounded-lg"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#0E0E0E] rounded-xl">
                      <div>
                        <p className="font-medium">Password</p>
                      </div>
                      <div className="text-[#F4EBDC]/50">••••••••</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preferences Section */}
          <div className="space-y-6">

            {/* Privacy & Support */}
            <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h2 className="font-medium text-xl mb-4">Privacy & Support</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-[#0E0E0E]">
                    <Shield className="h-5 w-5 text-[#F4EBDC]/70 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Privacy Settings</div>
                      <div className="text-sm text-[#F4EBDC]/70">Manage your data and privacy</div>
                    </div>
                  </Button>

                  <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-[#0E0E0E]">
                    <HelpCircle className="h-5 w-5 text-[#F4EBDC]/70 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Help & Support</div>
                      <div className="text-sm text-[#F4EBDC]/70">Get help and contact support</div>
                    </div>
                  </Button>

                  <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-[#0E0E0E]">
                    <Download className="h-5 w-5 text-[#F4EBDC]/70 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Download Data</div>
                      <div className="text-sm text-[#F4EBDC]/70">Export your account data</div>
                    </div>
                  </Button>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full py-4 mt-6 rounded-2xl bg-transparent border-[#333333] hover:bg-[#1A1A1A] text-[#FF4E4E] font-medium"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
