/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';

function useTime(initialTime) {
  const timeId = useRef(null);
  const [time, setTime] = useState(initialTime);

  const resetTime = useCallback(() => setTime(0), []);

  const createTimeId = useCallback(
    (ms) => {
      timeId.current = setInterval(() => {
        setTime((curState) => curState - ms);
      }, ms);
    },
    [timeId],
  );

  const removeTimeId = useCallback(() => {
    clearTimeout(timeId.current);
    timeId.current = null;
  }, []);

  useEffect(() => {
    if (!time) {
      removeTimeId();
    }
  }, [time]);

  return { time, resetTime, createTimeId, removeTimeId };
}

export default useTime;
