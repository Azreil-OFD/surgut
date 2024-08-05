import React, { useEffect, useState } from 'react';
import styles from "./HomePage.module.css";
import { AppInterface } from '../../types/AppInterfaces'; // Import your AppInterface if needed
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
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

  if (!data) {
    return <p>No data available</p>;
  }

  const toInfo = () => {
    navigate('/info');
  }

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
