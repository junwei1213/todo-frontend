import { useEffect, useState } from 'react';
import { todoApi, TodoItem } from '../api/todoApi';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      const { data } = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError('get todos failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <AddTodoForm onSuccess={fetchTodos} />
      <TodoList todos={todos} refreshList={fetchTodos} />
    </div>
  );
}