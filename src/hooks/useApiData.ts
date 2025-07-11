import { useState, useEffect, useCallback, useRef } from 'react';
import { API_CONFIG } from '../config/api';

interface UseApiDataOptions {
  refreshInterval?: number;
  enabled?: boolean;
}

export function useApiData<T>(
  fetchFunction: () => Promise<T>,
  options: UseApiDataOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const fetchFunctionRef = useRef(fetchFunction);

  const {
    refreshInterval = API_CONFIG.LIVE_UPDATE_INTERVAL,
    enabled = true
  } = options;

  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setError(null);
      const result = await fetchFunctionRef.current();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('API fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled || !refreshInterval) return;

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh
  };
}