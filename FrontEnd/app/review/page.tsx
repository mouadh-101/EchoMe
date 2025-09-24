"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AudioPlayer } from "@/components/audio/audio-player"
import { MapPin, Smile, Tag, Check, X } from "lucide-react"
import { audioService } from "@/app/services/audioService"
import { EchoAlert } from "@/components/ui/echo-alert"
import AuthGuard from "@/components/guard/AuthGuard"

export default function ReviewPage() {
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
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

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("audioUrl")
    if (storedUrl) {
      setAudioUrl(storedUrl)
    }
  }, [])

  const handleSubmit = async () => {
    const audio = sessionStorage.getItem("audioBase64")

    if (!audio) {
      alert("Audio data is missing.")
      return
    }

    // Convert base64 to Blob
    const byteString = atob(audio.split(",")[1])
    const mimeString = audio.split(",")[0].split(":")[1].split(";")[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const audioBlob = new Blob([ab], { type: mimeString })

    // Send to backend via FormData
    const formData = new FormData()
    formData.append("audio", audioBlob, "recording.wav")
    formData.append("description", description)

    try {
      const result = await audioService.create(formData)
      sessionStorage.removeItem("audioUrl")
      sessionStorage.removeItem("audioBase64")
      if (result.status == "success") {
        showAlertMessage("success", "Audio File added seccesfully", "Your echo has been saved successfully!")
      }
      router.push("/dashboard")
    } catch (err) {
      showAlertMessage("error", "Upload failed", "There was an error uploading your audio. Please try again.")
      console.error("Upload failed", err)
    }
  }


  const handleCancel = () => {
    sessionStorage.removeItem("audioUrl")
    setAudioUrl(null)
    router.push("/dashboard")
  }

  return (
    <AuthGuard>
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {showAlert.show && (
          <EchoAlert
            type={showAlert.type}
            message={showAlert.message}
            subMessage={showAlert.subMessage}
            dismissible={true}
            onDismiss={() => setShowAlert({ show: false, type: "success", message: "" })}
          />
        )}
        <h1 className="font-serif text-3xl font-bold mb-6">Review Your Echo</h1>

        <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Listen to your recording</h2>

            {audioUrl && <AudioPlayer src={audioUrl} title="Voice Note - Just Now" />}

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[#F4EBDC]/70 mb-2">Add a description (optional)</h3>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add notes or context to your recording..."
                  className="bg-[#0E0E0E] border-[#333333] rounded-xl resize-none h-32"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="rounded-xl border-[#333333] hover:bg-[#0E0E0E] hover:text-[#FF4E4E] hover:border-[#FF4E4E]"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button onClick={handleSubmit} className="rounded-xl bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E]">
            <Check className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </div>
      </div>
    </AuthGuard>
  )
}
