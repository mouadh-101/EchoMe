"use client"

import { useState,useEffect} from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio/audio-player"
import { Clock, Plus } from "lucide-react"
import { toDoListService } from "../../services/toDoListService"
import { toDoList,toDo } from "../../services/toDoListService"
import { EchoAlert } from "@/components/ui/echo-alert"
import {formatDistanceToNow} from 'date-fns';


export default function TodosPage() {
  const [todoList, setTodoList] = useState<toDoList>()
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
  
  const fetchTodoList = async () => {
    try {
      const response = await toDoListService.getToDoListById(Number(window.location.pathname.split('/').pop()));

      if (response.status === "success") {
        setTodoList(response.data);
        
      } else {
        console.error("Failed to fetch todo lists:", response.message);
      }
    } catch (error) {
      console.error("Error fetching todo lists:", error);
    }
  };
  
  useEffect(() => {
    fetchTodoList();
  }, []);

  



  const markOrUnmarkTodo = async (todoId: number) => {
    try {
      const response = await toDoListService.markOrUnmarkTodo(todoId);
      if (response.status === "success") {
        showAlertMessage("success", response.status , "Todo updated successfully.");
        setTodoList(prev => {
          if (!prev) return prev;
          const updatedTodos = prev.Todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          );
          return { ...prev, Todos: updatedTodos };
        });
      } else {
        showAlertMessage("error", response.status, "Failed to update todo");
        console.error("Failed to update todo:", response.message);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }
  

  return (
    
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold">To-Do Lists</h1>
        {showAlert.show && (
            <EchoAlert
              type={showAlert.type}
              message={showAlert.message}
              subMessage={showAlert.subMessage}
              dismissible={true}
              onDismiss={() => setShowAlert({ show: false, type: "success", message: "" })}
            />
          )}
      </div>

      <div className="space-y-6">
          <Card key={todoList?.id} className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
              <div>
                <CardTitle className="text-xl font-medium">{todoList?.title}</CardTitle>
                <div className="flex items-center text-sm text-[#F4EBDC]/70 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {todoList?.created_at ? formatDistanceToNow(new Date(todoList.created_at), { addSuffix: true }) : ""}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#1FB2A6]/20 text-[#1FB2A6] rounded-full">
                  {todoList?.Todos ? todoList.Todos.filter((t) => t.completed).length : 0}/{todoList?.Todos ? todoList.Todos.length : 0}
                </Badge>
                <AudioPlayer src={todoList?.Audio?.file_url} compact />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="space-y-2">
                {todoList?.Todos?.map((todo) => (
                  <div
                  
                    key={todo.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#0E0E0E] transition-colors"
                  >
                    <Checkbox
                      id={`list-${todoList?.id}-todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => markOrUnmarkTodo(todo.id)}
                      className="data-[state=checked]:bg-[#1FB2A6] data-[state=checked]:border-[#1FB2A6]"
                    />
                    <label
                      htmlFor={`list-${todoList?.id}-todo-${todo.id}`}
                      className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-[#F4EBDC]/50" : ""}`}
                    >
                      {todo.description}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <Link href={`/summary/${todoList?.Audio?.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F4EBDC]/70 hover:text-[#F4EBDC] hover:bg-[#0E0E0E]"
                  >
                    View original audio 
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        
      </div>
    </div>
  )
}
