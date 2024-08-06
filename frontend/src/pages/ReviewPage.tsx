import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../styles/ReviewPage.module.css';
import SubmitMessage from '../components/SubmitMessage';
import Header from '../components/Header';

interface Menu {
  name: string;
  reviewScore: number;
  photoUrl: string;
}

const ReviewPage: React.FC = () => {
  const [dailyMenu, setDailyMenu] = useState<Menu[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [reviewScore, setReviewScore] = useState<number>(3.0);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const fetchDailyMenu = async (date: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/menu/daily?date=${date}&sort=alphabet`,
      );
      setDailyMenu(response.data.menus);
    } catch (error) {
      console.error('Error fetching daily menu:', error);
    }
  };

  useEffect(() => {
    const dateString = currentDate.toISOString().split('T')[0];
    fetchDailyMenu(dateString);
  }, [currentDate]);

  const resetForm = () => {
    setReviewComment('');
    setSelectedMenu(null);
    setReviewScore(3.0);
    setSubmitted(false);
  };

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    do {
      newDate.setDate(newDate.getDate() - 1);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6);
    setCurrentDate(newDate);
    resetForm();
  };

  const handleNextDay = () => {
    const today = new Date();
    const newDate = new Date(currentDate);
    do {
      newDate.setDate(newDate.getDate() + 1);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6); // Skip weekends
    if (newDate <= today) {
      setCurrentDate(newDate);
      resetForm();
    }
  };

  const handleMenuChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenu(event.target.value);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewScore(parseFloat(event.target.value));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedMenu && reviewScore !== null) {
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/review`, {
          menuName: selectedMenu,
          reviewScore: reviewScore,
          reviewComment: reviewComment,
        });
        setSubmitted(true);
        localStorage.setItem(currentDate.toISOString().split('T')[0], 'true');

        resetForm();
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
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

  const isSubmitDisabled =
    !selectedMenu ||
    reviewScore === null ||
    submitted ||
    !!localStorage.getItem(currentDate.toISOString().split('T')[0]);

  const today = new Date();
  return (
    <div className={styles.menuPageContainer}>
      <Header />
      <div className={styles.menuPageHeader}>
        <button onClick={handlePreviousDay}>←</button>
        <div>{getDayString(currentDate)}</div>
        <button
          onClick={handleNextDay}
          className={
            currentDate.toDateString() === today.toDateString()
              ? styles.buttonDisabled
              : ''
          }
          disabled={currentDate.toDateString() === today.toDateString()}
        >
          →
        </button>
      </div>
      <div className={styles.reviewForm}>
        <select
          onChange={handleMenuChange}
          value={selectedMenu || ''}
          disabled={submitted}
        >
          <option value="">Select a menu</option>
          {dailyMenu.map((menu) => (
            <option key={menu.name} value={menu.name}>
              {menu.name}
            </option>
          ))}
        </select>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.5"
            value={reviewScore}
            onChange={handleSliderChange}
            className={styles.slider}
          />
          <span className={styles.sliderValue}>{reviewScore.toFixed(1)}</span>
        </div>
        <textarea
          placeholder="Write your review here"
          value={reviewComment}
          onChange={handleCommentChange}
          disabled={submitted}
        />
        <button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {submitted ||
          localStorage.getItem(currentDate.toISOString().split('T')[0])
            ? 'You have submitted this day'
            : 'Submit'}
        </button>
      </div>
      {showMessage && <SubmitMessage message="Submitted!" />}
      <div className={styles.ratingDescriptions}>
        <p>
          ★★★★★ This is a menu I can trust. On days when this is available,
          there&apos;s no need to look at other menus.
        </p>
        <p>
          ★★★★☆ Good taste, totally not bad, I choose this if no any other good
          choice.
        </p>
        <p>
          ★★★☆☆ Okay, When I&apos;m feeling adventurous or having a good day, I
          think I can choose this.
        </p>
        <p>
          ★★☆☆☆ When I&apos;m extremely hungry, I might allow myself to eat
          this.
        </p>
        <p>★☆☆☆☆ Definitely I will NOT order again. It made my bad day.</p>
      </div>
    </div>
  );
};

export default ReviewPage;
