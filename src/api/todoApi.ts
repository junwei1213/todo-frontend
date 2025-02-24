import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7278/api',
});

export type TodoItem = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdDate: string;
};

export const todoApi = {
  // get all todos
  getAll: () => api.get<TodoItem[]>('/todos'),
  
  // create todo
  create: (todo: Pick<TodoItem, 'title' | 'description'>) => 
    api.post<TodoItem>('/todos', todo),
  
  // update todo
  update: (id: number, todo: Partial<TodoItem>) => {
    console.log('Updating todo:', todo); // Log the request data
    return api.put<TodoItem>(`/todos/${id}`, todo);
  },
  // delete todo
  delete: (id: number) => 
    api.delete(`/todos/${id}`)
};