import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ tasks, droppableId }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-1/3 border border-black flex-col px-4 py-2 flex items-center"
        >
          {tasks.map((task, index) => (
            <Draggable key={task.title} draggableId={task.title} index={index}>
              {(provided) => (
                <div
                  className="w-full"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Task task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
