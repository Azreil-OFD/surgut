import React from 'react';
import {useNavigate} from 'react-router';
import useSavedData from "../hooks/useSavedData.ts";

const HomePage: React.FC = () => {
    const {data, isLoading, error} = useSavedData();
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    if (!data) {
        return <p>No data available</p>;
    }

    const toInfo = () => {
        navigate('/info');
    };

    const buttonStyle = {
        backgroundImage: `url(${data.mainScreen.button.backgroundImage})`,
        color: data.mainScreen.button.textColor
    };

    return (
        <div className="text-yellowgreen">
            <img
                src={data.mainScreen.background}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            />
            <div className="relative z-10 text-white text-center">
                <button
                    onClick={toInfo}
                    style={buttonStyle}
                    className="bg-cover bg-center rounded-full min-w-[300px] w-[21.5vw] min-h-[100px] h-[7.5vw] relative top-[77vh] text-[33px] font-extrabold cursor-pointer"
                >
                    {data.mainScreen.button.text}
                </button>
            </div>
        </div>
    );
};

export default HomePage;
