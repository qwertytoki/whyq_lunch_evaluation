import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/Ranking.css';
import Header from '../components/Header';

interface Menu {
  name: string;
  reviewScore: number;
  photoUrl: string;
}

const Ranking: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/menu`)
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menus:', error);
      });
  }, []);

  const handleItemClick = (menuName: string) => {
    const encodedMenuName = encodeURIComponent(menuName);
    navigate(`/menu/detail?name=${encodedMenuName}`);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    menuName: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleItemClick(menuName);
    }
  };

  return (
    <div className="ranking-container">
      <Header />
      <h1>Menu Ranking</h1>
      <div>
        {menus.map((menu) => (
          <div
            key={menu.name}
            className="menu-item"
            onClick={() => handleItemClick(menu.name)}
            onKeyDown={(e) => handleKeyPress(e, menu.name)}
            role="button"
            tabIndex={0}
          >
            <img src={menu.photoUrl} alt={menu.name} />
            <div className="menu-details">
              <div className="menu-name">{menu.name}</div>
              <div className="review-score">{menu.reviewScore}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
