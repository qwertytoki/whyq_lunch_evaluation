import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Ranking from './pages/Ranking';
import MenuDetail from './pages/MenuDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/menu/:id" element={<MenuDetail />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
