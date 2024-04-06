import { useEffect, useRef, useState } from 'react';
import VALUE from '../constants/value';

function useCountdown() {
  const intervalID = useRef(null);
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const createTimer = () => {
    intervalID.current = setInterval(() => {
      setTime((curState) => curState - VALUE.msUnit);
    }, VALUE.msUnit);
  };

  const removeTimer = () => {
    clearInterval(intervalID.current);
    intervalID.current = null;
  };

  const handleStart = (initialTime) => {
    if (initialTime > 0) {
      setIsStart(true);
      setTime(initialTime);
      createTimer();
    }
  };

  const handlePause = () => {
    if (isPause) {
      setIsPause(false);
      createTimer();
    } else {
      setIsPause(true);
      removeTimer();
    }
  };

  const handleReset = () => {
    setIsStart(false);
    setIsPause(false);
    setTime(0);
    removeTimer();
  };

  useEffect(() => {
    return () => {
      removeTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { time, isStart, isPause, handleStart, handlePause, handleReset };
}

export default useCountdown;
