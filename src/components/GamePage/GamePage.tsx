import React, {useState} from 'react';
import styles from "./GamePage.module.css";
import useSavedData from '../../hooks/useSavedData';
import Card from './Cards/Card';
import ProgressBar from '../ProgressBar';

const GamePage: React.FC = () => {
    const {data, isLoading, error} = useSavedData();
    const [progress, setProgress] = useState<number>(0);

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error loading data: {error.message}</div>;
    }

    if (!data) {
        return <div className={styles.noData}>No data available</div>;
    }

    const duration = data.gameWindow.progressBarTime * 1000;

    return (
        <div className={styles.gamePage}>
            <img
                src={data.mainScreen.background}
                alt="Background"
                className={styles.backgroundImage}
            />
            <div className={styles.overlay}>
                <Card
                    data={data.cards.firstPool}
                    image={data.gameWindow.defaultCard1}
                    setProgress={setProgress}
                    duration={duration}
                />
                <Card
                    data={data.cards.secondPool}
                    image={data.gameWindow.defaultCard2}
                />
            </div>
            <ProgressBar
                progress={progress}
                progressBarTime={duration}
                progressBarColor={data.gameWindow.progressBarColor}
            />
        </div>
    );
};

export default GamePage;