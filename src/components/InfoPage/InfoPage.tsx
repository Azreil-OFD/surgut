import React from 'react';
import styles from "./InfoPage.module.css";
import useSavedData from '../../hooks/useSavedData';

const InfoPage: React.FC = () => {
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
        src={data.infoWindow.background}
        alt="Background"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}>
        {data.infoWindow.text.map((element, index) => (
          <p 
            key={index} 
            className={styles.text}
            style={{ color: element.contentColor }}
          >
            <span 
              style={{ color: element.titleColor }}
            >
              {element.title}
            </span>
            &nbsp;{element.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoPage;
