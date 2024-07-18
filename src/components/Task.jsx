import React from 'react';

function Task({ task }) {
  return (
    <div className="cursor-move block my-2 py-3 px-3 text-sm text-left w-full border border-gray-400">
      <div className="font-bold">{task.title}</div>
      <div>{task.description}</div>
      <div className="flex justify-between mt-2 text-xs ">
        <div>Status: <span className="font-bold">{task.status}</span> </div>
        <div className="text-gray-400">Assignee: {task.assignee}</div>
      </div>

    </div>
  );
}

export default Task;
