import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number; // Прогресс в процентах
  progressBarTime: number; // Общая продолжительность таймера в миллисекундах
  progressBarColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, progressBarTime, progressBarColor }) => {
  const progressPercentage = (progress / progressBarTime) * 100;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${progressPercentage}%`, backgroundColor: `${progressBarColor}` }}
      />
    </div>
  );
};

export default ProgressBar;
