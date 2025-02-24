import React, { useState } from 'react';
import { todoApi } from '../api/todoApi';

interface AddTodoFormProps {
  onSuccess: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await todoApi.create({ title, description });
      setTitle('');
      setDescription('');
      onSuccess();
    } catch (err) {
      setError('Add todo failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Add Todo
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default AddTodoForm;