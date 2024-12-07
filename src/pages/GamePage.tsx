import React, { useState } from 'react';
import ProgressBar from "../components/ProgressBar.tsx";
import useSavedData from "../hooks/useSavedData.ts";
import Card from "../components/GamePage/Cards";

const GamePage: React.FC = () => {
    const { data, isLoading, error } = useSavedData();
    const [progress, setProgress] = useState<number>(0);

    // Обработка состояния загрузки
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    // Обработка ошибок
    if (error) {
        return <div>Ошибка загрузки данных: {error.message}</div>;
    }

    // Проверка наличия данных
    if (!data) {
        return <div>Нет доступных данных</div>;
    }

    const duration = data.gameWindow.progressBarTime * 1000;

    return (
        <div
            className="relative w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${data.gameWindow.background})` }}
        >
            {/* Основной контент */}
            <div className="font-bold flex flex-row justify-evenly items-center h-full z-10 text-white whitespace-pre-wrap">
                <Card
                    data={data.cards.firstPool}
                    image={data.gameWindow.defaultCard1}
                    setProgress={setProgress}
                    duration={duration}
                />
                <Card
                    data={data.cards.secondPool}
                    image={data.gameWindow.defaultCard2}
                    setProgress={setProgress}
                    duration={duration}
                />
            </div>

            {/* Индикатор прогресса */}
            <ProgressBar
                progress={progress}
                progressBarTime={duration}
                progressBarColor={data.gameWindow.progressBarColor}
            />
        </div>
    );
};

export default GamePage;
