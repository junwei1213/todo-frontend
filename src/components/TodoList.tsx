import { TodoItem } from '../api/todoApi';
import TodoItemCard from './TodoItemCard';

type Props = {
  todos: TodoItem[];
  refreshList: () => void;
};

export default function TodoList({ todos, refreshList }: Props) {
  return (
    <div className="space-y-3 mt-4">
      {todos.map(todo => (
        <TodoItemCard 
          key={todo.id} 
          todo={todo}
          onUpdate={refreshList}
          onDelete={refreshList}
        />
      ))}
    </div>
  );
}