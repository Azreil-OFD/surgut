import React, { useEffect, useState } from 'react';
import styles from "./InfoPage.module.css";
import { AppInterface } from '../../types/AppInterfaces'; // Import your AppInterface if needed
import { useNavigate } from 'react-router-dom';

const InfoPage: React.FC = () => {
  const [data, setData] = useState<AppInterface | null>(null);
  const navigate = useNavigate();

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

  const toInfo = () => {
    navigate('/')
  }

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
            {/* <button onClick={toInfo}></button> */}
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

export default InfoPage;
