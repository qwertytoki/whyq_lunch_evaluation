import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/MenuDetail.css';

interface MenuDetail {
  name: string;
  reviewScore: number;
  photoUrl: string;
  reviewComments: string[];
  listed_history: string[];
}

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const MenuDetail: React.FC = () => {
  const location = useLocation();
  const [menuDetail, setMenuDetail] = useState<MenuDetail | null>(null);

  // Get the menuName from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const menuName = queryParams.get('name');

  useEffect(() => {
    if (menuName) {
      axios
        .get(`${apiBaseUrl}/menu/detail`, {
          params: { name: menuName },
        })
        .then((response) => {
          setMenuDetail(response.data);
        })
        .catch((error) => {
          console.error('Error fetching menu details:', error);
        });
    }
  }, [menuName]);

  if (!menuDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-detail-container">
      <div className="menu-header">
        <h1 className="menu-name">{menuDetail.name}</h1>
        <div className="review-score">
          Review score: {menuDetail.reviewScore}
        </div>
      </div>
      <div className="menu-content">
        <img
          src={menuDetail.photoUrl}
          alt={menuDetail.name}
          className="menu-photo"
        />
        <div className="menu-info">
          <div className="review-comments">
            <h2>Review Comments</h2>
            {menuDetail.reviewComments.map((comment, index) => (
              <div key={index} className="review-comment">
                {comment}
              </div>
            ))}
          </div>
          <div className="listed-history">
            <h2>Listed Dates</h2>
            {menuDetail.listed_history.map((date, index) => (
              <div key={index} className="listed-date">
                {new Date(date).toLocaleDateString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
