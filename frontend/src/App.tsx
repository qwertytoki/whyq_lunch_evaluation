import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Ranking from './pages/Ranking';
import MenuDetail from './pages/MenuDetail';
import MenuPage from './pages/MenuPage';
import ReviewPage from './pages/ReviewPage';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/detail" element={<MenuDetail />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
