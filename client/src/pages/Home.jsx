import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/courses">Courses</Link></li>
          <li className="nav-item"><Link to="/signup">Signup</Link></li>
          <li className="nav-item"><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <h1 className="welcome-message">Welcome to the Course Selling App</h1>
    </div>
  );
}

export default Home;