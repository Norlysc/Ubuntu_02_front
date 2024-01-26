/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export default function useFetch({ queryFn, dependencies = [] }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError();
      setData();

      try {
        const result = await queryFn({ abortController });
        if (!abortController.signal.aborted) setData(result);
      } catch (err) {
        if (!abortController.signal.aborted) setError(err.message);
      } finally {
        if (!abortController.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, dependencies);

  return { data, loading, error };
}
