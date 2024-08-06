import React, { useCallback, useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from "./Card.module.css";
import { CardsPool } from '../../../types/AppInterfaces';

interface Props {
  data: CardsPool[];
  image: string;
}

const Card: React.FC<Props> = ({ data, image }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [randomQuestion, setRandomQuestion] = useState<string>('');

  // Функция для получения случайного вопроса
  const getRandomQuestion = useCallback(() => {
    const questions = data.map((card: CardsPool) => card.url);
    return questions[Math.floor(Math.random() * questions.length)];
  }, [data]);

  // Обновляем случайный вопрос при изменении карточки
  useEffect(() => {
    if (isFlipped) {
      setRandomQuestion(getRandomQuestion());

      const timer = setTimeout(() => {
        setIsFlipped(false);
      }, 60000);

      // Очистка таймера при размонтировании компонента или изменении состояния
      return () => clearTimeout(timer);
    }
  }, [isFlipped, getRandomQuestion]);

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
  )
}

export default Card;
