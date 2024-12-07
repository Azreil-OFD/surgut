import {useEffect, useState} from 'react';
import {AppInterface} from '../types/AppInterfaces';

const useSavedData = () => {
    const [data, setData] = useState<AppInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const savedData = localStorage.getItem("appServiceState");
                if (savedData) {
                    const parsedData: AppInterface = JSON.parse(savedData);
                    setData(parsedData);
                }
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return {data, isLoading, error};
};

export default useSavedData;
