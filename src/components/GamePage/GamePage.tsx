import React from 'react';
import styles from "./GamePage.module.css";
import useSavedData from '../../hooks/useSavedData';
import Card from './Cards/Card';

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
    <div className={styles.gamePage}>
      <img
        src={data.gameWindow.background}
        alt="Background"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}>
        <Card data={data.cards.firstPool} image={data.gameWindow.defaultCard1}/>
        <Card data={data.cards.secondPool} image={data.gameWindow.defaultCard2}/>
      </div>
    </div>
  );
};

export default GamePage;