import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>WhyQ Lunch Evaluation</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/review" className={styles.navLink}>
              Review Page
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/menu" className={styles.navLink}>
              Daily Menu List
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/ranking" className={styles.navLink}>
              Ranking Page
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
