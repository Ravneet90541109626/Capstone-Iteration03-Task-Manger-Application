// src/components/Navbar.jsx
import PropTypes from 'prop-types';  // Import PropTypes

const Navbar = ({ setSection, setShowCompleted, showCompleted }) => {
  return (
    <nav>
      <ul>
        <li onClick={() => setSection('home')}>Home</li>
        <li onClick={() => setSection('tasks')}>Tasks</li>
        <li onClick={() => setSection('about')}>About</li>
        <li onClick={() => setSection('contact')}>Contact</li>
        <li onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
        </li>
      </ul>
    </nav>
  );
};


// PropTypes validation
Navbar.propTypes = {
  setSection: PropTypes.func.isRequired,
  setShowCompleted: PropTypes.func.isRequired,
  showCompleted: PropTypes.bool.isRequired,
};

export default Navbar;


