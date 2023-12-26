import { useCallback } from 'react';
import MESSAGE from '../constants/message';
import VALUE from '../constants/value';

const RANGE = Object.freeze({
  minutes: 0,
  second: 1,
  min: 0,
  max: 3599 * VALUE.msUnit,
});
const ERROR_RETURN = 0;

function useValidate() {
  const validateRange = useCallback((answer, type) => {
    const number = Number(answer);
    const range = RANGE[type];

    if (!Number.isSafeInteger(range) || number < range) {
      window.alert(MESSAGE.error.rangeEach);
      return ERROR_RETURN;
    }

    return number;
  }, []);

  const calculateinitialTime = useCallback((inputsMap) => {
    const [minutes, second] = [...inputsMap.values()];
    const initialTime = minutes * VALUE.timeUnit + second;

    return initialTime * VALUE.msUnit;
  }, []);

  const validateTotalTime = useCallback(
    (inputsMap) => {
      const { min, max } = RANGE;
      const initialTime = calculateinitialTime(inputsMap);

      if (initialTime < min || initialTime > max) {
        window.alert(MESSAGE.error.rangeTotal);
        return ERROR_RETURN;
      }

      return initialTime;
    },
    [calculateinitialTime],
  );

  const validate = useCallback(
    (inputs) => {
      const inputsMap = new Map(Object.entries(inputs));

      inputsMap.forEach((answer, type) => {
        const number = validateRange(answer, type);
        inputsMap.set(type, number);
      });

      return validateTotalTime(inputsMap);
    },
    [validateRange, validateTotalTime],
  );

  return { validate };
}

export default useValidate;
