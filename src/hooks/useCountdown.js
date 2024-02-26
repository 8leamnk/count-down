import { useCallback, useEffect, useRef, useState } from 'react';
import VALUE from '../constants/value';

function useCountdown() {
  const intervalID = useRef(null);
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const createTimer = useCallback(() => {
    intervalID.current = setInterval(() => {
      setTime((curState) => curState - VALUE.msUnit);
    }, VALUE.msUnit);
  }, []);

  const removeTimer = useCallback(() => {
    clearTimeout(intervalID.current);
    intervalID.current = null;
  }, []);

  const handleStart = useCallback(
    (initialTime) => {
      if (initialTime > 0) {
        setIsStart(true);
        setTime(initialTime);
        createTimer();
      }
    },
    [createTimer],
  );

  const handlePause = useCallback(() => {
    if (isPause) {
      setIsPause(false);
      createTimer();
    } else {
      setIsPause(true);
      removeTimer();
    }
  }, [isPause, createTimer, removeTimer]);

  const handleReset = useCallback(() => {
    setIsStart(false);
    setIsPause(false);
    setTime(0);
    removeTimer();
  }, [removeTimer]);

  useEffect(() => {
    return () => {
      removeTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { time, isStart, isPause, handleStart, handlePause, handleReset };
}

export default useCountdown;
