import { useState } from 'react';
import { todoApi, TodoItem } from '../api/todoApi';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import EditTodoModal from './EditTodoModal';

type Props = {
  todo: TodoItem;
  onUpdate: () => void;
  onDelete: () => void;
};

export default function TodoItemCard({ todo, onUpdate, onDelete }: Props) {
  const [showEdit, setShowEdit] = useState(false);

  const toggleComplete = async () => {
    await todoApi.update(todo.id, { 
      isCompleted: !todo.isCompleted 
    });
    onUpdate();
  };

  return (
    <>
      <div className="border rounded-lg p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className={`flex items-center space-x-3 ${todo.isCompleted ? 'opacity-50' : ''}`}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={toggleComplete}
              className="h-5 w-5"
            />
            <div>
              <h3 className={`text-lg ${todo.isCompleted ? 'line-through' : ''}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-gray-500 mt-1">{todo.description}</p>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-400">
            {new Date(todo.createdDate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setShowEdit(true)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <PencilIcon className="h-5 w-5 text-blue-500" />
          </button>
          <button
            onClick={async () => {
              await todoApi.delete(todo.id);
              onDelete();
            }}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>

      {showEdit && (
        <EditTodoModal
          todo={todo}
          onClose={() => setShowEdit(false)}
          onSuccess={onUpdate}
        />
      )}
    </>
  );
}