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
    skipAnswerStage?: boolean; // Новый пропс
}

type CardStage = 'default' | 'question' | 'answer';

const Card: React.FC<CardProps> = ({
                                       data,
                                       defaultImage,
                                       setProgress,
                                       setActiveCard,
                                       duration,
                                       cardId,
                                       activeCard,
                                       skipAnswerStage = false
                                   }) => {
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

        if (cardStage === 'question') {
            setRandomQuestion(getRandomQuestion());
            setIsFlipped(true); // Переворот на обратную сторону
            if (activeCard === cardId && setProgress && duration) {
                progressInterval = startProgress(duration);
            }
            timer = setTimeout(() => {
                if (skipAnswerStage) {
                    setIsFlipped(false); // Переворот на лицевую сторону
                    setCardStage('default'); // Пропускаем стадию answer
                } else {
                    setCardStage('answer');
                }
                resetProgress();
            }, duration);
        } else if (cardStage === 'answer') {
            setRandomAnswer(getRandomAnswer());
            setIsFlipped(false); // Возврат на лицевую сторону
            if (activeCard === cardId && setProgress && duration) {
                progressInterval = startProgress(duration);
            }
            timer = setTimeout(() => {
                setCardStage('default');
                resetProgress();
            }, duration);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [cardStage, activeCard, cardId, duration, setProgress, getRandomQuestion, getRandomAnswer, skipAnswerStage]);

    const handleClick = () => {
        if (cardStage === 'default') {
            setCardStage('question');
            if (setActiveCard) setActiveCard(cardId);
        } else if (cardStage === 'question') {
            if (skipAnswerStage) {
                setIsFlipped(false); // Переворот на лицевую сторону
                setCardStage('default'); // Пропускаем answer при клике
                resetProgress();
            } else {
                setCardStage('answer');
                resetProgress();
            }
        } else if (cardStage === 'answer') {
            setCardStage('default');
            resetProgress();
        }
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName={styles.card}>
            {/* Лицевая сторона карты */}
            <div className={`${styles.front}`} onClick={handleClick}>
                {cardStage === 'default' && <img src={defaultImage} alt="Front" />}
                {cardStage === 'answer' && <img src={randomAnswer} alt="Answer" />}
            </div>
            {/* Обратная сторона карты */}
            <div className={`${styles.back}`} onClick={handleClick}>
                {cardStage === 'question' && <img src={randomQuestion} alt="Question" />}
            </div>
        </ReactCardFlip>
    );
};

export default Card;
