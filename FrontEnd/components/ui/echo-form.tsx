"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface FormField {
  label: string
  name: string
  type: "text" | "email" | "password" | "textarea" | "date" | "select"
  placeholder?: string
  required?: boolean
  options?: string[]
}

interface EchoFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => void
  buttonText: string
  variant?: "inline" | "block" | "modal"
  className?: string
}

export function EchoForm({ fields, onSubmit, buttonText, variant = "block", className = "" }: EchoFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField, index: number) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      value: formData[field.name] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleInputChange(field.name, e.target.value),
      className: `bg-[#0E0E0E] border-[#333333] rounded-xl text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6] transition-all ${
        errors[field.name] ? "border-red-500" : ""
      }`,
      autoFocus: index === 0,
    }

    switch (field.type) {
      case "textarea":
        return <Textarea {...commonProps} rows={4} className={`${commonProps.className} resize-none`} />
      case "select":
        return (
          <Select value={formData[field.name] || ""} onValueChange={(value) => handleInputChange(field.name, value)}>
            <SelectTrigger className={commonProps.className}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#333333]">
              {field.options?.map((option) => (
                <SelectItem key={option} value={option} className="text-[#F4EBDC] focus:bg-[#0E0E0E]">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return <Input {...commonProps} type={field.type} />
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-sm font-medium text-[#F4EBDC]">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(field, index)}
          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E] font-medium rounded-xl shadow-[0_0_15px_rgba(31,178,166,0.5)] hover:shadow-[0_0_25px_rgba(31,178,166,0.7)] transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : buttonText}
      </Button>
    </form>
  )

  if (variant === "modal" || variant === "block") {
    return (
      <Card className={`bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-6">{formContent}</CardContent>
      </Card>
    )
  }

  return <div className={className}>{formContent}</div>
}
