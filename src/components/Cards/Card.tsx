import React, { useCallback, useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from './Card.module.css';
import { CardItem, CardsPool } from '../../types/AppInterfaces.ts';

interface CardProps {
    data: CardsPool;
    defaultImage: string;
    setProgress?: (time: number) => void;
    setActiveCard?: (id: string) => void;
    duration?: number;
    cardId: string;
    activeCard: string | null;
}

type CardStage = 'default' | 'question' | 'answer';

const Card: React.FC<CardProps> = ({ data, defaultImage, setProgress, setActiveCard, duration, cardId, activeCard }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardStage, setCardStage] = useState<CardStage>('default');
    const [randomQuestion, setRandomQuestion] = useState<string>('');
    const [randomAnswer, setRandomAnswer] = useState<string>('');

    const getRandomQuestion = useCallback(() => {
        const questions = data.questions.map((card: CardItem) => card.url);
        return questions[Math.floor(Math.random() * questions.length)];
    }, [data]);

    const getRandomAnswer = useCallback(() => {
        const answers = data.answers.map((card: CardItem) => card.url);
        return answers[Math.floor(Math.random() * answers.length)];
    }, [data]);

    const startProgress = (duration: number) => {
        if (setProgress) {
            setProgress(0);
            const startTime = Date.now();
            const progressInterval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime >= duration) {
                    setProgress(duration);
                    clearInterval(progressInterval);
                } else {
                    setProgress(elapsedTime);
                }
            }, 100);
            return progressInterval;
        }
    };

    const resetProgress = () => {
        if (setProgress) {
            setProgress(0);
        }
    };

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        let progressInterval: ReturnType<typeof setInterval> | undefined;

        if (isFlipped && cardStage === 'question') {
            setRandomQuestion(getRandomQuestion());
            if (activeCard === cardId && setProgress && duration) {
                progressInterval = startProgress(duration);
            }
            timer = setTimeout(() => {
                setCardStage('answer');
                resetProgress();
            }, duration);
        } else if (isFlipped && cardStage === 'answer') {
            setRandomAnswer(getRandomAnswer());
            if (activeCard === cardId && setProgress && duration) {
                progressInterval = startProgress(duration);
            }
            timer = setTimeout(() => {
                setIsFlipped(false);
                setCardStage('default');
                resetProgress();
            }, duration);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [isFlipped, cardStage, activeCard, cardId, duration, setProgress, getRandomQuestion, getRandomAnswer]);

    const handleClick = () => {
        if (!isFlipped) {
            setIsFlipped(true);
            setCardStage('question');
            if (setActiveCard) setActiveCard(cardId);
        } else if (cardStage === 'question') {
            setCardStage('answer');
            resetProgress();
        } else if (cardStage === 'answer') {
            setIsFlipped(false);
            setCardStage('default');
            resetProgress();
        }
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName={styles.card}>
            {/* Лицевая сторона карты */}
            <div className={`${styles.front}`} onClick={handleClick}>
                <img src={defaultImage} alt="Front" />
            </div>
            {/* Обратная сторона карты */}
            <div className={`${styles.back}`} onClick={handleClick}>
                {cardStage === 'question' && <img src={randomQuestion} alt="Question" />}
                {cardStage === 'answer' && <img src={randomAnswer} alt="Answer" />}
            </div>
        </ReactCardFlip>
    );
};

export default Card;
