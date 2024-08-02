import React, { useEffect, useState } from 'react';
import styles from "./HomePage.module.css";
import { AppInterface } from '../../types/AppInterfaces'; // Import your AppInterface if needed

const HomePage: React.FC = () => {
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
    <div className={styles.homePage}>
      {data ? (
        <>
          <img
              src={data.mainScreen.background}
              alt="Background"
              className={styles.backgroundImage}
            />
          <div className={styles.overlay}>
            <h1>Home Page</h1>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default HomePage;
