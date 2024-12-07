import React from 'react';

interface ProgressBarProps {
    progress: number; // Прогресс в процентах
    progressBarTime: number; // Общая продолжительность таймера в миллисекундах
    progressBarColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, progressBarTime, progressBarColor }) => {
    const progressPercentage = (progress / progressBarTime) * 100;

    return (
        <div className="w-full h-[15px] bg-transparent overflow-hidden my-2 relative -top-6 z-5 rounded-none">
            <div
                className="h-full transition-width duration-100 ease-linear"
                style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: progressBarColor,
                }}
            />
        </div>
    );
};

export default ProgressBar;
