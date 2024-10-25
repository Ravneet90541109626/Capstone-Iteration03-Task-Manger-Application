// src/components/TaskList.jsx
import PropTypes from 'prop-types';

const TaskList = ({ tasks, toggleComplete, deleteTask, undoDelete }) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.task} (Priority: {task.priority})</span>
            <div>
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={undoDelete}>Undo Last Delete</button>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  undoDelete: PropTypes.func.isRequired, // Add undoDelete prop
};

export default TaskList;
