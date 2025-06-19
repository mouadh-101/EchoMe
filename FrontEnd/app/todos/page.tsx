"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio/audio-player"
import { Clock, Plus } from "lucide-react"
import { toDoListService } from "../services/toDoListService"
import { toDoList, toDo } from "../services/toDoListService"
import { EchoAlert } from "@/components/ui/echo-alert"
import {formatDistanceToNow} from 'date-fns';
export default function TodosPage() {
  const [todoLists, setTodoLists] = useState<toDoList[]>([])

  const fetchTodoLists = async () => {
    try {
      const response = await toDoListService.fetchToDoLists();
      if (response.status === "success") {
        setTodoLists(response.data);
      } else {
        console.error("Failed to fetch todo lists:", response.message);
      }
    }
    catch (error) {
      console.error("Error fetching todo lists:", error);
    }
  }
  useEffect(() => {
    fetchTodoLists();
  }, [])


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
                  {formatDistanceToNow(new Date(list.created_at), { addSuffix: true })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#1FB2A6]/20 text-[#1FB2A6] rounded-full">
                  {list.Todos.filter((t) => t.completed).length}/{list.Todos.length}
                </Badge>
                <AudioPlayer src={list.Audio?.file_url} compact />
              </div>

            </CardHeader>
            <CardContent>
              <div className="flex justify-end mt-4">
                <Link href={`/todos/${list.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F4EBDC]/70 hover:text-[#F4EBDC] hover:bg-[#0E0E0E]"
                  >
                    View More
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
