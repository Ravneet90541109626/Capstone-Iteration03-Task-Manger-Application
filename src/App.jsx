// src/App.jsx
import { useState, useEffect } from 'react'; // No need to import React anymore
import Header from './components/Header';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [section, setSection] = useState('home'); // State to manage current section
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [deletedTask, setDeletedTask] = useState(null); // Track the last deleted task for undo

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (task, priority) => {
    const newTask = {
      id: Date.now(), // Generate a unique id based on timestamp
      task,
      priority,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
    setDeletedTask(taskToDelete); // Store the deleted task for undo
  };

  const undoDelete = () => {
    if (deletedTask) {
      const updatedTasks = [...tasks, deletedTask]; // Restore the deleted task
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
      setDeletedTask(null); // Clear the deleted task
    }
  };

  const filteredTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed);

  const renderSection = () => {
    switch (section) {
      case 'home':
        return <Home />;
      case 'tasks':
        return (
          <>
            <AddTaskForm addTask={addTask} />
            <TaskList
              tasks={filteredTasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              undoDelete={undoDelete} // Pass undo function to TaskList
            />
          </>
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Header />
      <Navbar setSection={setSection} setShowCompleted={setShowCompleted} showCompleted={showCompleted} />
      <main>
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
