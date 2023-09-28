

import React, { useState, useEffect } from 'react';

const CircleLoader = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Sample to-do list with tasks
  const [todoList, setTodoList] = useState([
    { id: 1, text: 'wait here for 5sec', completed: true, loading: false },
    { id: 2, text: 'wait here for 5sec', completed: false, loading: false },
    { id: 3, text: 'wait here for 5sec', completed: true, loading: false },
    { id: 4, text: 'wait here for 5sec', completed: true, loading: false },
    { id: 5, text: 'wait here for 5sec', completed: true, loading: false },
    { id: 6, text: 'wait here for 5sec ', completed: false, loading: false },
  ]);

  // Simulate an API call or async operation with a 2-second delay
  useEffect(() => {
    setTimeout(() => {
      // Replace this with your actual success or failure condition
      const isSuccess = Math.random() < 0.5;
      setResult(isSuccess);
      setLoading(false);
    }, 2000);
  }, []);

  // Colors for the loader
  const colors = ['#ff0000', '#00ff00', '#0000ff'];

  // Function to toggle the loader visibility
  const toggleLoader = () => {
    setShowLoader(!showLoader);
  };

  // Function to toggle the popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setShowLoader(false)
  };

  // Function to handle task completion
  const handleTaskClick = (taskId) => {
    const updatedList = [...todoList];
    updatedList[taskId - 1].loading = true;
    setTodoList(updatedList);

    // Simulate task completion after a 2-second delay
    setTimeout(() => {
      updatedList[taskId - 1].completed = !updatedList[taskId - 1].completed;
      updatedList[taskId - 1].loading = false;
      setTodoList(updatedList);
    }, 5000);
  };

  // Rotate colors while loading
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 500); // Change color every 0.5 seconds

    return () => clearInterval(colorInterval);
  }, []);

  // Simulate a 4-second delay to update completed tasks
  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      const completedTaskIds = todoList
        .filter((task) => task.completed)
        .map((task) => task.id);
        
        return setCompletedTasks === 0 ? "hello" : setCompletedTasks(completedTaskIds);

    },5000 );

    return () => clearTimeout(spinnerTimeout);
  }, [todoList]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
       {/* Button to toggle the loader  */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md m-2"
        onClick={toggleLoader}
      >
        {showLoader ? 'Hide Loader' : 'Show Loader'}
      </button>

      {/* Loader */}
      {showLoader ? (
        <div
          className="w-20 h-20 border-4 border-transparent border-t-4 border-gray-900 rounded-full animate-spin absolute top-0 right-0 m-8"
          style={{ borderTopColor: colors[colorIndex] }}
        >
          <div className="flex items-center justify-center w-full h-full absolute top-0">
            <img
              src="https://th.bing.com/th/id/OIP.vlqWDc5hAWspQqyZKmVGCgHaHR?w=211&h=207&c=7&r=0&o=5&pid=1.7"
              alt="Your Image"
              className="w-7 h-7 rounded-full cursor-pointer"
              onClick={togglePopup}
            />
          </div>
        </div>
      ) : null}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">To-Do List</h2>
            <ul>
              {/* Displaying tasks */}
              {todoList.map((task) => (
                <li key={task.id} className={`flex items-center justify-between mb-2`}>
                  {task.text}
                  {completedTasks.includes(task.id) ? (
                    <span className="text-green-500 cursor-pointer" onClick={() => handleTaskClick(task.id)}>
                      ✓
                    </span>
                  ) : (
                    <span className="text-red-500 cursor-pointer" onClick={() => handleTaskClick(task.id)}>
                      ✕
                    </span>
                  )}
                </li>
              ))}
            </ul>
                    
            {/* Close button */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
              onClick={togglePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircleLoader;
