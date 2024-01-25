import { useCallback, useState } from 'react';

function useStart() {
  const [isStart, setIsStart] = useState(false);

  const startCountdown = useCallback((time, handleTime, createTimeId) => {
    if (time > 0) {
      setIsStart(true);
      handleTime(time);
      createTimeId();
    }
  }, []);

  const handleStart = useCallback(
    (getInitialTime, handleTime, createTimeId) => {
      if (!isStart) {
        const time = getInitialTime();

        startCountdown(time, handleTime, createTimeId);
      }
    },
    [isStart, startCountdown],
  );

  const resetStart = useCallback(() => {
    setIsStart(false);
  }, []);

  return { isStart, handleStart, resetStart };
}

export default useStart;
