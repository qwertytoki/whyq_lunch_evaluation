import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MenuPage.css';

interface Menu {
  id: string;
  name: string;
  reviewScore: number;
  photoUrl: string;
}

interface DailyMenu {
  dateString: string;
  menus: Menu[];
}

const MenuPage: React.FC = () => {
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const fetchDailyMenu = async (date: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/menu/daily?date=${date}`,
      );
      setDailyMenu(response.data);
    } catch (error) {
      console.error('Error fetching daily menu:', error);
    }
  };

  useEffect(() => {
    const dateString = currentDate.toISOString().split('T')[0];
    fetchDailyMenu(dateString);
  }, [currentDate]);

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    do {
      newDate.setDate(newDate.getDate() - 1);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6); // Skip weekends
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    do {
      newDate.setDate(newDate.getDate() + 1);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6); // Skip weekends
    setCurrentDate(newDate);
  };

  const getDayString = (date: Date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    } as const;
    return date.toLocaleDateString(undefined, options);
  };

  if (!dailyMenu) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-page-container">
      <div className="menu-page-header">
        <button onClick={handlePreviousDay}>←</button>
        <div>{getDayString(currentDate)}</div>
        <button onClick={handleNextDay}>→</button>
      </div>
      <div className="menu-list">
        {dailyMenu.menus.map((menu) => (
          <div key={menu.id} className="menu-item">
            <img src={menu.photoUrl} alt={menu.name} className="menu-photo" />
            <div className="menu-details">
              <div className="menu-name">{menu.name}</div>
              <div className="menu-score">{menu.reviewScore}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
