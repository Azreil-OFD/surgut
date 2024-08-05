import React, { useEffect, useState } from 'react';
import styles from "./GamePage.module.css";
import { AppInterface } from '../../types/AppInterfaces';

const GamePage: React.FC = () => {
  const [data, setData] = useState<AppInterface | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("appServiceState");
    if (savedData) {
      try {
        const parsedData: AppInterface = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse appServiceState:", error);
        setData(null);
      }
    }
  }, []);

  return (
    <div className={styles.infoPage}>
      {data ? (
        <>
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
                style={{color: element.contentColor}}
              >
                <span 
                  style={{color: element.titleColor}}
                >
                  {element.title}
                </span>
                &nbsp;{element.content}
              </p>
            ))}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default GamePage;
