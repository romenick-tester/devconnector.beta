import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async(x) => {
        setLoading(true);

        try {
            const response = await fetch(x);
            const dataSet = await response.json();

            setData(dataSet);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        fetchData(url);
    }, [url]);

    return { loading, error, data }
}

export default useFetch;