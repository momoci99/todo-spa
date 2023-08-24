import { useEffect, useState } from "react";

interface FetchResult<T> {
  response: T | null;
  error: Error | null;
  isLoading: boolean;
  abort: () => void;
}

const useFetch = <T>(
  url: string,
  options: RequestInit = {}
): FetchResult<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const abortController = new AbortController(); // Create the AbortController instance here

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const signal = abortController.signal;
        const res = await fetch(url, { ...options, signal });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  const abort = () => {
    abortController.abort();
  };

  return { response, error, isLoading, abort };
};

export default useFetch;
