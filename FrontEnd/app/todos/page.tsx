"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio/audio-player"
import { Clock, Plus } from "lucide-react"

export default function TodosPage() {
  // Sample todo lists associated with voice notes
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      title: "Project Planning",
      timestamp: "Today, 10:23 AM",
      todos: [
        { id: 1, text: "Check with design team about mockups", completed: true },
        { id: 2, text: "Set up development environment", completed: false },
        { id: 3, text: "Schedule kickoff meeting for Monday", completed: false },
        { id: 4, text: "Follow up with marketing about launch plan", completed: false },
        { id: 5, text: "Review timeline for phase one completion", completed: false },
      ],
    },
    {
      id: 2,
      title: "Weekly Shopping",
      timestamp: "Yesterday, 4:15 PM",
      todos: [
        { id: 1, text: "Buy milk and eggs", completed: true },
        { id: 2, text: "Get fresh vegetables", completed: true },
        { id: 3, text: "Pick up new book from store", completed: false },
      ],
    },
    {
      id: 3,
      title: "Home Improvement Ideas",
      timestamp: "Jun 1, 2:30 PM",
      todos: [
        { id: 1, text: "Research paint colors for living room", completed: false },
        { id: 2, text: "Call contractor for bathroom quote", completed: false },
        { id: 3, text: "Buy new plants for patio", completed: false },
      ],
    },
  ])

  const toggleTodo = (listId: number, todoId: number) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)),
            }
          : list,
      ),
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold">To-Do Lists</h1>
        <Button className="rounded-xl bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E]">
          <Plus className="mr-2 h-4 w-4" />
          New List
        </Button>
      </div>

      <div className="space-y-6">
        {todoLists.map((list) => (
          <Card key={list.id} className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
              <div>
                <CardTitle className="text-xl font-medium">{list.title}</CardTitle>
                <div className="flex items-center text-sm text-[#F4EBDC]/70 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {list.timestamp}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#1FB2A6]/20 text-[#1FB2A6] rounded-full">
                  {list.todos.filter((t) => t.completed).length}/{list.todos.length}
                </Badge>
                <AudioPlayer compact />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="space-y-2">
                {list.todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#0E0E0E] transition-colors"
                  >
                    <Checkbox
                      id={`list-${list.id}-todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(list.id, todo.id)}
                      className="data-[state=checked]:bg-[#1FB2A6] data-[state=checked]:border-[#1FB2A6]"
                    />
                    <label
                      htmlFor={`list-${list.id}-todo-${todo.id}`}
                      className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-[#F4EBDC]/50" : ""}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <Link href={`/summary?id=${list.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F4EBDC]/70 hover:text-[#F4EBDC] hover:bg-[#0E0E0E]"
                  >
                    View Original Note
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
