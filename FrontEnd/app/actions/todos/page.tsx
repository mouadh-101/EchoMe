"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { AudioPlayer } from "@/components/audio/audio-player"
import { ArrowLeft, Plus, Save } from "lucide-react"

export default function TodosActionPage() {
  // Initial AI-generated todos
  const [todos, setTodos] = useState([
    { id: 1, text: "Check with design team about mockups", completed: false },
    { id: 2, text: "Set up development environment", completed: false },
    { id: 3, text: "Schedule kickoff meeting for Monday", completed: false },
    { id: 4, text: "Follow up with marketing about launch plan", completed: false },
    { id: 5, text: "Review timeline for phase one completion", completed: false },
  ])

  const [newTodoText, setNewTodoText] = useState("")

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const addTodo = () => {
    if (newTodoText.trim()) {
      setTodos([
        ...todos,
        {
          id: Math.max(0, ...todos.map((t) => t.id)) + 1,
          text: newTodoText.trim(),
          completed: false,
        },
      ])
      setNewTodoText("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/summary" className="mr-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-serif text-3xl font-bold">Generated To-Do List</h1>
      </div>

      <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Project Planning</h2>
            <AudioPlayer compact />
          </div>

          <p className="text-[#F4EBDC]/70 text-sm mb-6">
            These tasks were automatically generated from your voice note. You can edit, add, or remove tasks as needed.
          </p>

          <div className="space-y-3 mb-6">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#0E0E0E] transition-colors"
              >
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="data-[state=checked]:bg-[#1FB2A6] data-[state=checked]:border-[#1FB2A6]"
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-[#F4EBDC]/50" : ""}`}
                >
                  {todo.text}
                </label>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Input
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="bg-[#0E0E0E] border-[#333333] rounded-xl"
            />
            <Button onClick={addTodo} className="rounded-xl bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E]">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Link href="/summary">
          <Button variant="outline" className="rounded-xl border-[#333333] hover:bg-[#0E0E0E]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Summary
          </Button>
        </Link>

        <Link href="/todos">
          <Button className="rounded-xl bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E]">
            <Save className="mr-2 h-4 w-4" />
            Save to To-Do Lists
          </Button>
        </Link>
      </div>
    </div>
  )
}
