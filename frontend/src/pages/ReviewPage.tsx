import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReviewPage.css';

interface Menu {
  id: string;
  name: string;
  reviewScore: number;
  photoUrl: string;
}

const ReviewPage: React.FC = () => {
  const [dailyMenu, setDailyMenu] = useState<Menu[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [reviewScore, setReviewScore] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(3.0);

  const fetchDailyMenu = async (date: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/menu/daily?date=${date}`,
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

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    do {
      newDate.setDate(newDate.getDate() - 1);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const today = new Date();
    const newDate = new Date(currentDate);
    do {
      newDate.setDate(newDate.getDate() + 1);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6); // Skip weekends
    if (newDate <= today) {
      setCurrentDate(newDate);
    }
  };

  const handleMenuChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenu(event.target.value);
  };

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewScore(Number(event.target.value));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewComment(event.target.value);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseFloat(event.target.value));
  };

  const handleSubmit = async () => {
    if (selectedMenu && reviewScore !== null) {
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/review`, {
          menu_id: selectedMenu,
          review_score: reviewScore,
          review_comment: reviewComment,
        });
        setSubmitted(true);
        localStorage.setItem(
          `${currentDate.toISOString().split('T')[0]}_${selectedMenu}`,
          'true',
        );
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

  const isSubmitDisabled = !selectedMenu || reviewScore === null || submitted;
  const today = new Date();
  return (
    <div className="menu-page-container">
      <div className="menu-page-header">
        <button onClick={handlePreviousDay}>←</button>
        <div>{getDayString(currentDate)}</div>
        <button
          onClick={handleNextDay}
          className={
            currentDate.toDateString() === today.toDateString()
              ? 'button-disabled'
              : ''
          }
          disabled={currentDate.toDateString() === today.toDateString()}
        >
          →
        </button>
      </div>
      <div className="review-form">
        <select onChange={handleMenuChange} disabled={submitted}>
          <option value="">Select a menu</option>
          {dailyMenu.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <div className="slider-container">
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.1"
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider"
          />
          <span className="slider-value">{sliderValue}</span>
        </div>

        <textarea
          placeholder="Write your review here"
          value={reviewComment}
          onChange={handleCommentChange}
          disabled={submitted}
        />
        <button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {submitted ? 'You have submitted review' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;