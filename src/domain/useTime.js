import { useCallback, useEffect, useRef, useState } from 'react';
import VALUE from '../constants/value';

function useTime() {
  const intervalID = useRef(null);
  const [time, setTime] = useState(0);

  const createTimeId = useCallback(() => {
    intervalID.current = setInterval(() => {
      setTime((curState) => curState - VALUE.msUnit);
    }, VALUE.msUnit);
  }, []);

  const removeTimeId = useCallback(() => {
    clearTimeout(intervalID.current);
    intervalID.current = null;
  }, []);

  const handleTime = useCallback((timeToUpdate = 0) => {
    setTime(timeToUpdate);
  }, []);

  useEffect(() => {
    return () => {
      removeTimeId();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { time, createTimeId, removeTimeId, handleTime };
}

export default useTime;
