import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from '../styles/MenuPage.module.css';
import Header from '../components/Header';

interface Menu {
  name: string;
  reviewScore: number;
  photoUrl: string;
}

interface DailyMenu {
  dateString: string;
  menus: Menu[];
}

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('API Base URL:', apiBaseUrl);

const MenuPage: React.FC = () => {
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const fetchDailyMenu = async (date: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/menu/daily?date=${date}`);
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

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousDay();
      } else if (event.key === 'ArrowRight') {
        handleNextDay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentDate]);

  const handleItemClick = (menuName: string) => {
    const encodedMenuName = encodeURIComponent(menuName);
    navigate(`/menu/detail?name=${encodedMenuName}`);
  };

  if (!dailyMenu) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.menuPageContainer}>
      <Header />
      <div className={styles.menuPageHeader}>
        <button onClick={handlePreviousWeek}>≪</button>
        <button onClick={handlePreviousDay}>←</button>
        <div>{getDayString(currentDate)}</div>
        <button onClick={handleNextDay}>→</button>
        <button onClick={handleNextWeek}>≫</button>
      </div>
      <div className={styles.menuList}>
        {dailyMenu.menus.map((menu) => (
          <div
            key={menu.name}
            className={styles.menuItem}
            onClick={() => handleItemClick(menu.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleItemClick(menu.name);
            }}
            role="button"
            tabIndex={0}
          >
            <img
              src={menu.photoUrl}
              alt={menu.name}
              className={styles.menuPhoto}
            />
            <div className={styles.menuDetails}>
              <div className={styles.menuName}>{menu.name}</div>
              <div className={styles.menuScore}>{menu.reviewScore}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
