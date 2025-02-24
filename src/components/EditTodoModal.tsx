import { useState, useEffect } from "react";
import { TodoItem, todoApi } from "../api/todoApi";

type Props = {
  todo: TodoItem;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditTodoModal({ todo, onClose, onSuccess }: Props) {
  const [id] = useState(todo.id);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setIsCompleted(todo.isCompleted);
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log("Submitting update:", { title, description, isCompleted });
      await todoApi.update(todo.id, { id, title, description, isCompleted });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
            maxLength={100}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            rows={3}
          />
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="h-5 w-5"
            />
            <label>Completed</label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
