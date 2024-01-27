import { useCallback } from 'react';
import VALUE from '../constants/value';

const TENS_DIGIT = 10;
const NUMERIC_SPACE = '0';

function useConvertToTime() {
  const displayTime = useCallback((number) => {
    if (number >= TENS_DIGIT) {
      return number;
    }

    return `${NUMERIC_SPACE}${number}`;
  }, []);

  const convertToTime = useCallback(
    (targetTime) => {
      const totalTime = targetTime / VALUE.msUnit;
      const minutes = Math.floor(totalTime / VALUE.timeUnit);
      const second = totalTime % VALUE.timeUnit;

      return `${displayTime(minutes)}:${displayTime(second)}`;
    },
    [displayTime],
  );

  return { convertToTime };
}

export default useConvertToTime;
