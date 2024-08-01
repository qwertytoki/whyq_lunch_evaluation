import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.backToHome}>
        ← Back To Home
      </Link>
    </header>
  );
};

export default Header;
