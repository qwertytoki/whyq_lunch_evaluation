import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Ranking from './pages/Ranking';
import MenuDetail from './pages/MenuDetail';
import MenuPage from './pages/MenuPage';
import ReviewPage from './pages/ReviewPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuDetail />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
