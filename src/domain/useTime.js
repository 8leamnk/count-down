/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from 'react';

const MS = 1000;

function useTime(initialTime) {
  const timeId = useRef(null);
  const [time, setTime] = useState(initialTime);

  const resetTime = useCallback(() => setTime(0), []);

  const createTimeId = useCallback(() => {
    timeId.current = setInterval(() => {
      setTime((curState) => curState - MS);
    }, MS);
  }, [timeId]);

  const removeTimeId = useCallback(() => {
    clearTimeout(timeId.current);
    timeId.current = null;
  }, []);

  return { time, resetTime, createTimeId, removeTimeId };
}

export default useTime;
