import { useCallback, useState } from 'react';

function useStart({ handleTime, createTimeId }) {
  const [isStart, setIsStart] = useState(false);

  const handleStart = useCallback((nextState) => setIsStart(nextState), []);

  const handleStartCountdown = useCallback(
    (initialTime) => {
      if (!isStart && initialTime) {
        handleStart(true);
        handleTime(initialTime);
        createTimeId();
      }
    },
    [isStart, handleStart, handleTime, createTimeId],
  );

  return { isStart, handleStartCountdown, handleStart };
}

export default useStart;
