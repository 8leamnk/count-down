import { useEffect, useRef, useState } from 'react';
import { UNIT } from '@/constants/global';

function useCountdown() {
  const intervalID = useRef<NodeJS.Timeout>(null);
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const removeTimer = () => {
    if (intervalID.current) {
      clearInterval(intervalID.current);
      intervalID.current = null;
    }
  };

  const createTimer = () => {
    removeTimer();

    intervalID.current = setInterval(() => {
      setTime((curState) => curState - UNIT.msUnit);
    }, UNIT.msUnit);
  };

  const handleStart = (initialTime: number) => {
    if (initialTime > 0) {
      setIsStart(true);
      setTime(initialTime);
      createTimer();
    }
  };

  const handlePause = () => {
    if (isStart) {
      if (isPause) {
        setIsPause(false);
        createTimer();
      } else {
        setIsPause(true);
        removeTimer();
      }
    }
  };

  const handleReset = () => {
    setIsStart(false);
    setIsPause(false);
    setTime(0);
    removeTimer();
  };

  useEffect(() => {
    if (isStart && time === 0) {
      handleReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart, time]);

  useEffect(() => {
    return () => {
      removeTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { time, isStart, isPause, handleStart, handlePause, handleReset };
}

export default useCountdown;
