import React from 'react';
import useSavedData from '../../hooks/useSavedData';
import InfoText from "./InfoText.tsx";

const Info: React.FC = () => {
    const { data, isLoading, error } = useSavedData();

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка загрузки данных: {error.message}</p>;
    }

    if (!data) {
        return <p>Нет доступных данных</p>;
    }

    return (
        <div className="overflow-hidden font-bold">
            <img
                src={data.infoWindow.background}
                alt="Фоновое изображение"
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            />
            <div className="relative z-10 text-white text-left text-[min(calc(5px+2vw),30px)] m-8">
                {data.infoWindow.text.map((element, index) => (
                    <InfoText key={index} element={element} />
                ))}
            </div>
        </div>
    );
};

export default Info;
