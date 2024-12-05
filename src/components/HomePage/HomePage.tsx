import React from 'react';
import styles from "./HomePage.module.css";
import { useNavigate } from 'react-router';
import useSavedData from '../../hooks/useSavedData'; // Импортируйте ваш кастомный хук

const HomePage: React.FC = () => {
  const { data, isLoading, error } = useSavedData();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const toInfo = () => {
    navigate('/info');
  };

  const buttonStyle = {
    backgroundImage: `url(${data.mainScreen.button.backgroundImage})`,
    color: data.mainScreen.button.textColor
  };

  return (
    <div className={styles.homePage}>
      <img
        src={data.mainScreen.background}
        alt="Background"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}>
        <button
          onClick={toInfo}
          style={buttonStyle}
          className={styles.customButton}
        >
          {data.mainScreen.button.text}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
