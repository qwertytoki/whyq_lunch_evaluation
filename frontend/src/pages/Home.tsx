import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>WhyQ Lunch Evaluation</h1>
      <nav>
        <ul>
          <li>
            <Link to="/review">Review Page</Link>
          </li>
          <li>
            <Link to="/menu">Menu Page</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
