import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Menu {
  id: string;
  name: string;
  reviewScore: number;
  photoUrl: string;
}

const Ranking: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/menu')
      .then((response) => {
        console.log(response.data);
        setMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menus:', error);
      });
  }, []);

  const handleItemClick = (id: string) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div>
      <h1>Menu Ranking</h1>
      <div>
        {menus.map((menu) => (
          <div
            key={menu.id}
            role="button"
            tabIndex={0}
            onClick={() => handleItemClick(menu.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleItemClick(menu.id);
              }
            }}
            style={{ cursor: 'pointer', marginBottom: '20px' }}
          >
            <img
              src={menu.photoUrl}
              alt={menu.name}
              style={{ width: '100px', height: '100px' }}
            />
            <div>{menu.name}</div>
            <div>{menu.reviewScore}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
