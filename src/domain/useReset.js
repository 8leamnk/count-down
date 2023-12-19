import { useCallback } from 'react';

function useReset(resetTime, handleStart, handlePause, removeTimeId) {
  const onReset = useCallback(() => {
    resetTime();
    handleStart(false);
    handlePause(false);
    removeTimeId();
  }, [resetTime, handleStart, handlePause, removeTimeId]);

  return { onReset };
}

export default useReset;
