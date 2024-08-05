import React from 'react';
import styles from "./GamePage.module.css";
import useSavedData from '../../hooks/useSavedData';

const GamePage: React.FC = () => {
  const { data, isLoading, error } = useSavedData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div className={styles.infoPage}>
      <img
        src={data.gameWindow.background}
        alt="Background"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}>
        
      </div>
    </div>
  );
};

export default GamePage;