import React, { useCallback, useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from './Card.module.css';
import { CardItem, CardsPool } from '../../types/AppInterfaces.ts';

interface CardProps {
    data: CardsPool;
    image: string;
    setProgress?: (time: number) => void;
    setActiveCard?: (id: string) => void;
    duration?: number;
    cardId: string;
    activeCard: string | null;
}

const Card: React.FC<CardProps> = ({ data, image, setProgress, setActiveCard, duration, cardId, activeCard }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [randomQuestion, setRandomQuestion] = useState<string>('');

    const getRandomQuestion = useCallback(() => {
        const questions = data.questions.map((card: CardItem) => card.url);
        return questions[Math.floor(Math.random() * questions.length)];
    }, [data]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        let progressInterval: ReturnType<typeof setInterval> | undefined;

        if (isFlipped) {
            // Устанавливаем случайный вопрос при переворачивании
            setRandomQuestion(getRandomQuestion());

            if (activeCard === cardId && setProgress && duration) {
                setProgress(0);
                const startTime = Date.now();

                // Обновляем прогресс только для активной карточки
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

            // Таймер переворачивания карточки обратно
            timer = setTimeout(() => {
                setIsFlipped(false);
                if (activeCard === cardId && setProgress) {
                    setProgress(0);
                }
            }, duration);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [isFlipped, activeCard, cardId, duration, setProgress, getRandomQuestion]);

    const handleClick = () => {
        setIsFlipped((prev) => {
            const newState = !prev;
            if (newState && setActiveCard) {
                setActiveCard(cardId); // Устанавливаем активную карточку
            }
            return newState;
        });
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName={styles.card}>
            {/* Лицевая сторона карты */}
            <div className={`${styles.front}`} onClick={handleClick}>
                <img src={image} alt="Front" />
            </div>
            {/* Обратная сторона карты */}
            <div className={`${styles.back}`} onClick={handleClick}>
                <img src={randomQuestion} alt="Back" />
            </div>
        </ReactCardFlip>
    );
};

export default Card;
