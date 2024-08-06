import React, { useCallback, useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from './Card.module.css';
import { CardsPool } from '../../../types/AppInterfaces';

interface Props {
  data: CardsPool[];
  image: string;
  setProgress?: Function;
  duration?: number;
}

const Card: React.FC<Props> = ({ data, image, setProgress, duration }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [randomQuestion, setRandomQuestion] = useState<string>('');

  const getRandomQuestion = useCallback(() => {
    const questions = data.map((card: CardsPool) => card.url);
    return questions[Math.floor(Math.random() * questions.length)];
  }, [data]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isFlipped) {
      setRandomQuestion(getRandomQuestion());

      if (duration && setProgress) {
        setProgress(0);

        timer = setTimeout(() => {
          setIsFlipped(false);
          if (setProgress) setProgress(0);
        }, duration);

        // Обновляем прогресс каждые 100 мс
        progressInterval = setInterval(() => {
          setProgress((prev: number) => {
            if (prev >= duration) {
              clearInterval(progressInterval);
              return duration;
            }
            return prev + 100;
          });
        }, 100);

        // Очистка таймеров при размонтировании компонента или изменении состояния
        return () => {
          clearTimeout(timer);
          clearInterval(progressInterval);
        };
      }
    } else {
      if (setProgress) setProgress(0);
    }
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