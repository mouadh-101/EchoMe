"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EchoForm } from "@/components/ui/echo-form"
import { EchoAlert } from "@/components/ui/echo-alert"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

export default function ExamplesPage() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null)
  const [formVariant, setFormVariant] = useState<"inline" | "block" | "modal">("block")

  const showAlert = (type: "success" | "error" | "info" | "warning") => {
    setActiveAlert(type)

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setActiveAlert(null)
    }, 5000)
  }

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted:", data)
    showAlert("success")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Component Examples</h1>
        <p className="text-[#F4EBDC]/70">Showcase of EchoMe's reusable UI components</p>
      </div>

      {/* Alert Examples */}
      <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-xl">EchoAlert Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button
              onClick={() => showAlert("success")}
              className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 rounded-xl"
            >
              <CheckCircle className="h-5 w-5" />
              Show Success Alert
            </Button>

            <Button
              onClick={() => showAlert("error")}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-xl"
            >
              <AlertCircle className="h-5 w-5" />
              Show Error Alert
            </Button>

            <Button
              onClick={() => showAlert("info")}
              className="flex items-center gap-2 bg-[#1FB2A6]/20 hover:bg-[#1FB2A6]/30 text-[#1FB2A6] border border-[#1FB2A6]/50 rounded-xl"
            >
              <Info className="h-5 w-5" />
              Show Info Alert
            </Button>

            <Button
              onClick={() => showAlert("warning")}
              className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50 rounded-xl"
            >
              <AlertTriangle className="h-5 w-5" />
              Show Warning Alert
            </Button>
          </div>

          {activeAlert === "success" && (
            <EchoAlert
              type="success"
              message="Operation completed successfully"
              subMessage="Your changes have been saved."
              dismissible={true}
              onDismiss={() => setActiveAlert(null)}
            />
          )}

          {activeAlert === "error" && (
            <EchoAlert
              type="error"
              message="An error occurred"
              subMessage="Please try again or contact support."
              dismissible={true}
              onDismiss={() => setActiveAlert(null)}
            />
          )}

          {activeAlert === "info" && (
            <EchoAlert
              type="info"
              message="Information notice"
              subMessage="This is additional information you might find useful."
              dismissible={true}
              onDismiss={() => setActiveAlert(null)}
            />
          )}

          {activeAlert === "warning" && (
            <EchoAlert
              type="warning"
              message="Warning notice"
              subMessage="Please review this information carefully before proceeding."
              dismissible={true}
              onDismiss={() => setActiveAlert(null)}
            />
          )}
        </CardContent>
      </Card>

      {/* Form Examples */}
      <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">EchoForm Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todo" className="mb-6">
            <TabsList className="bg-[#0E0E0E] rounded-xl mb-4">
              <TabsTrigger
                value="todo"
                className="rounded-lg data-[state=active]:bg-[#1FB2A6] data-[state=active]:text-[#0E0E0E]"
              >
                To-Do Form
              </TabsTrigger>
              <TabsTrigger
                value="note"
                className="rounded-lg data-[state=active]:bg-[#1FB2A6] data-[state=active]:text-[#0E0E0E]"
              >
                Note Description
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="rounded-lg data-[state=active]:bg-[#1FB2A6] data-[state=active]:text-[#0E0E0E]"
              >
                Contact Form
              </TabsTrigger>
            </TabsList>

            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <Button
                  onClick={() => setFormVariant("inline")}
                  variant={formVariant === "inline" ? "default" : "outline"}
                  className={formVariant === "inline" ? "bg-[#1FB2A6] text-[#0E0E0E]" : ""}
                >
                  Inline
                </Button>
                <Button
                  onClick={() => setFormVariant("block")}
                  variant={formVariant === "block" ? "default" : "outline"}
                  className={formVariant === "block" ? "bg-[#1FB2A6] text-[#0E0E0E]" : ""}
                >
                  Block
                </Button>
                <Button
                  onClick={() => setFormVariant("modal")}
                  variant={formVariant === "modal" ? "default" : "outline"}
                  className={formVariant === "modal" ? "bg-[#1FB2A6] text-[#0E0E0E]" : ""}
                >
                  Modal
                </Button>
              </div>
              <p className="text-sm text-[#F4EBDC]/70">Select a form variant to see different styling options</p>
            </div>

            <TabsContent value="todo">
              <EchoForm
                fields={[
                  {
                    label: "Task Title",
                    name: "title",
                    type: "text",
                    placeholder: "Write your task",
                    required: true,
                  },
                  {
                    label: "Due Date",
                    name: "dueDate",
                    type: "date",
                    placeholder: "",
                    required: false,
                  },
                  {
                    label: "Priority",
                    name: "priority",
                    type: "select",
                    options: ["Low", "Medium", "High"],
                    required: false,
                  },
                ]}
                onSubmit={handleFormSubmit}
                buttonText="Add Task"
                variant={formVariant}
              />
            </TabsContent>

            <TabsContent value="note">
              <EchoForm
                fields={[
                  {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                    placeholder: "Add context or summary to your voice note...",
                    required: false,
                  },
                ]}
                onSubmit={handleFormSubmit}
                buttonText="Save Changes"
                variant={formVariant}
              />
            </TabsContent>

            <TabsContent value="contact">
              <EchoForm
                fields={[
                  {
                    label: "Name",
                    name: "name",
                    type: "text",
                    placeholder: "Your name",
                    required: true,
                  },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    placeholder: "your.email@example.com",
                    required: true,
                  },
                  {
                    label: "Message",
                    name: "message",
                    type: "textarea",
                    placeholder: "Your message...",
                    required: true,
                  },
                ]}
                onSubmit={handleFormSubmit}
                buttonText="Send Message"
                variant={formVariant}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
