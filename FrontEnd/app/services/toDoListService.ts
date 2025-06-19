import { getToken } from '../utils/auth';
import { BackendResponse } from '../utils/backEndRespons';

interface toDoList {
    id: number,
    audio_id: number | null,
    title: String,
    Todos: toDo[],
    Audio: audioUrl | null,
    created_at: Date,
    updated_at: Date,
}
interface toDo {
    id: number,
    description: String,
    completed: boolean
}
interface audioUrl{
    id: number;
    file_url: string;
}


class ToDoListService {
    private baseUrl = 'http://localhost:5000/api/todoList';

    async fetchToDoLists(): Promise<BackendResponse<toDoList[]>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user audio');
            }

            const data: BackendResponse<toDoList[]> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to fetch user audio');
        }

    }
    async getToDoListById(id: number): Promise<BackendResponse<toDoList>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch todo list');
            }

            const data: BackendResponse<toDoList> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to fetch todo list');
        }
    }
    async markOrUnmarkTodo(todoId: number): Promise<BackendResponse<toDo>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}/mark/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to mark todo as completed');
            }

            const data: BackendResponse<toDo> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to mark todo as completed');
        }
    }
    async createToDoList(audioId: number): Promise<BackendResponse<toDoList>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}/create/${audioId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create todo list');
            }

            const data: BackendResponse<toDoList> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to create todo list');
        }
    }
}

export const toDoListService = new ToDoListService();
export type { toDo, toDoList }