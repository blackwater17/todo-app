import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import AddTaskPopup from './components/AddTaskPopup';
import Column from './components/Column';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);

  useEffect(() => {
    fetch('/input.json')
      .then(response => response.json())
      .then(data => {

        const isValid = data.every(task => (
          task.title && task.description && task.assignee && task.status
        ));

        if (!isValid) {
          toast.error('Invalid input.json - Make sure it\'s formatted correctly.');
          return;
        }
        setTasks(data)
      })
      .catch(error => {
        toast.error('Error fetching input.json');
        console.error('Error fetching the tasks:', error)
      });
  }, []);

  // Function to handle drag end event
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;

    if (!destination) {
      return;
    }

    // the task being dragged
    const draggedTask = tasks.find(task => task.title === draggableId);

    if (!draggedTask) {
      return;
    }

    // Updating the status of the dragged task
    const updatedTasks = tasks.map(task => {
      if (task.title === draggableId) {
        return {
          ...task,
          status: getColumnStatus(destination.droppableId)
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Helper tool - Because we avoided using uppercase characters in classNames
  const getColumnStatus = (columnId) => {
    switch (columnId) {
      case 'column-done':
        return 'Done';
      case 'column-in-progress':
        return 'In Progress';
      case 'column-to-do':
        return 'To Do';
      default:
        return '';
    }
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleAddTaskPopup = () => {
    setShowAddTaskPopup(!showAddTaskPopup);
  };

  const closeAddTaskPopup = () => {
    setShowAddTaskPopup(false);
  };

  return (
    <div className="App">
      <ToastContainer />
      {tasks.length > 0 &&
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container mx-auto py-8 px-2">

            <div className="flex justify-between gap-4">
              <Column tasks={tasks.filter(task => task.status === "Done")} droppableId="column-done" />
              <Column tasks={tasks.filter(task => task.status === "In Progress")} droppableId="column-in-progress" />
              <Column tasks={tasks.filter(task => task.status === "To Do")} droppableId="column-to-do" />
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 my-4 rounded-md hover:bg-blue-600 transition-colors duration-300 mb-4"
              onClick={toggleAddTaskPopup}
            >
              Add New Task
            </button>

            {showAddTaskPopup && (
              <AddTaskPopup onSubmit={addTask} onClose={closeAddTaskPopup} />
            )}

          </div>
        </DragDropContext>
      }
    </div>
  );
}

export default App;
