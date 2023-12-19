/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from 'react';
import VALUE from '../constants/value';

function useTime(initialTime) {
  const timeId = useRef(null);
  const [time, setTime] = useState(initialTime);

  const resetTime = useCallback(() => setTime(0), []);

  const createTimeId = useCallback(() => {
    const { ms } = VALUE;

    timeId.current = setInterval(() => {
      setTime((curState) => curState - ms);
    }, ms);
  }, [timeId]);

  const removeTimeId = useCallback(() => {
    clearTimeout(timeId.current);
    timeId.current = null;
  }, []);

  return { time, resetTime, createTimeId, removeTimeId };
}

export default useTime;
