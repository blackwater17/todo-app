import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddTaskPopup = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [assignee, setAssignee] = useState('');

  const isNotEmpty = str => str.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isNotEmpty(title) || !isNotEmpty(description) || !isNotEmpty(status) || !isNotEmpty(assignee)) {
      toast.error('Please fill in all fields with valid values.');
      return;
    }

    const newTask = {
      title,
      description,
      status,
      assignee
    };
    onSubmit(newTask);
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setAssignee('');
    onClose(); // Close the popup after submitting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
            <select
              id="status"
              className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Done">Done</option>
              <option value="In Progress">In Progress</option>
              <option value="To Do">To Do</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee:</label>
            <input
              type="text"
              id="assignee"
              className="border border-gray-300 rounded-md w-full px-3 py-2 mt-1"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mr-2"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;
