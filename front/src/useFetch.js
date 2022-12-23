import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [Url, setUrl] = useState(url);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(Url, { signal: abortController.signal, credentials: 'include', })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                }
                return res.json();
            })
            .then(dat => {
                
                setData(dat); 
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError') {
                } else {
                    setIsPending(false);
                    setError(err.message);
                }                
            });
        
        return () => { abortController.abort(); };
    }, [Url]);
    return {data, isPending, error, setData, setUrl};
}

export default useFetch;