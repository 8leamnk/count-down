import { useCallback, useRef, useState } from 'react';
import VALUE from '../constants/value';

function useTime() {
  const timeId = useRef(null);
  const [time, setTime] = useState(0);

  const handleTime = useCallback((ms) => setTime(ms), []);

  const createTimeId = useCallback(() => {
    timeId.current = setInterval(() => {
      setTime((curState) => curState - VALUE.msUnit);
    }, VALUE.msUnit);
  }, [timeId]);

  const removeTimeId = useCallback(() => {
    clearTimeout(timeId.current);
    timeId.current = null;
  }, []);

  return { time, handleTime, createTimeId, removeTimeId };
}

export default useTime;
