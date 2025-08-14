import { UNIT } from '../constants/global';

const TENS_DIGIT = 10;
const NUMERIC_SPACE = '0';

function useConvertToTime() {
  const displayTime = (number: number) => {
    if (number >= TENS_DIGIT) {
      return number;
    }

    return `${NUMERIC_SPACE}${number}`;
  };

  const convertToTime = (targetTime: number) => {
    const totalTime = targetTime / UNIT.msUnit;
    const minute = Math.floor(totalTime / UNIT.timeUnit);
    const second = totalTime % UNIT.timeUnit;

    return `${displayTime(minute)}:${displayTime(second)}`;
  };

  return { convertToTime };
}

export default useConvertToTime;
