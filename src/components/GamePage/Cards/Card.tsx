import React, { useCallback, useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from './Card.module.css';
import {CardItem, CardsPool} from '../../../types/AppInterfaces';

interface Props {
    data: CardsPool;
    image: string;
    setProgress?: Function;
    duration?: number;
}

const Card: React.FC<Props> = ({ data, image, setProgress, duration }) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [randomQuestion, setRandomQuestion] = useState<string>('');

    const getRandomQuestion = useCallback(() => {
        const questions = data.questions.map((card: CardItem) => card.url);
        return questions[Math.floor(Math.random() * questions.length)];
    }, [data]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        let progressInterval: NodeJS.Timeout | undefined;

        if (isFlipped) {
            setRandomQuestion(getRandomQuestion());

            if (duration && setProgress) {
                setProgress(0);
                const startTime = Date.now();

                // Таймер переворота обратно
                timer = setTimeout(() => {
                    setIsFlipped(false);
                    setProgress(0);
                }, duration);

                // Интервал обновления прогресса
                progressInterval = setInterval(() => {
                    const elapsedTime = Date.now() - startTime;
                    if (elapsedTime >= duration) {
                        setProgress(duration);
                        clearInterval(progressInterval);
                    } else {
                        setProgress(elapsedTime);
                    }
                }, 100);
            }
        } else if (setProgress) {
            setProgress(0);
        }

        // Очистка таймеров при размонтировании или изменении зависимости
        return () => {
            if (timer) clearTimeout(timer);
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [isFlipped, getRandomQuestion, duration, setProgress]);


    const handleClick = () => {
        setIsFlipped(prevIsFlipped => !prevIsFlipped);
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName={styles.card}>
            <div key="front" onClick={handleClick} style={{ cursor: 'pointer' }}>
                <img src={image} alt='Front' style={{ width: '100%', height: 'auto' }} />
            </div>
            <div key="back" onClick={handleClick} style={{ cursor: 'pointer' }}>
                <img src={randomQuestion} alt='Back' style={{ width: '100%', height: 'auto' }} />
            </div>
        </ReactCardFlip>
    );
};

export default Card;