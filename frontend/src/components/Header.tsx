import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="back-to-home">
        ← Back To Home
      </Link>
    </header>
  );
};

export default Header;
