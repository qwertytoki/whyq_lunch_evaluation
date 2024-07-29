import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Ranking.css';

interface Menu {
  id: string;
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

  const handleItemClick = (id: string) => {
    navigate(`/menu/${id}`);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleItemClick(id);
    }
  };

  return (
    <div className="ranking-container">
      <h1>Menu Ranking</h1>
      <div>
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="menu-item"
            onClick={() => handleItemClick(menu.id)}
            onKeyPress={(e) => handleKeyPress(e, menu.id)}
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
