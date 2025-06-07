import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useApiData } from './useApiData';

describe('useApiData', () => {
  it('retrieves data successfully', async () => {
    const fetchFn = vi.fn().mockResolvedValue('value');
    const { result } = renderHook(() => useApiData(fetchFn, { refreshInterval: 0 }));

    await waitFor(() => !result.current.loading);
    expect(result.current.data).toBe('value');
    expect(result.current.error).toBeNull();
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('handles fetch errors', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useApiData(fetchFn, { refreshInterval: 0 }));

    await waitFor(() => !result.current.loading);
    expect(result.current.error).toBe('fail');
    expect(result.current.data).toBeNull();
  });

  it('refresh fetches new data', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce('first')
      .mockResolvedValueOnce('second');

    const { result } = renderHook(() => useApiData(fetchFn, { refreshInterval: 0 }));

    await waitFor(() => !result.current.loading);
    expect(result.current.data).toBe('first');

    await act(async () => {
      result.current.refresh();
    });

    await waitFor(() => result.current.data === 'second');
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });
});
