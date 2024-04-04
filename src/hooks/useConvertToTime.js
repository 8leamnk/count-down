import VALUE from '../constants/value';

const TENS_DIGIT = 10;
const NUMERIC_SPACE = '0';

function useConvertToTime() {
  const displayTime = (number) => {
    if (number >= TENS_DIGIT) {
      return number;
    }

    return `${NUMERIC_SPACE}${number}`;
  };

  const convertToTime = (targetTime) => {
    const totalTime = targetTime / VALUE.msUnit;
    const minute = Math.floor(totalTime / VALUE.timeUnit);
    const second = totalTime % VALUE.timeUnit;

    return `${displayTime(minute)}:${displayTime(second)}`;
  };

  return { convertToTime };
}

export default useConvertToTime;
