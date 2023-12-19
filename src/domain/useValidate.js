import { useCallback, useState } from 'react';
import MESSAGE from '../constants/message';

const NOT_NUMBER = /[^0-9]/;
const RANGE = Object.freeze({
  minutes: 0,
  second: 1,
  min: 0,
  max: 3599,
});
const TIME_UNIT = 60;
const ERROR_RETURN = 0;

function useValidate() {
  const [answerTime, setAnswerTime] = useState({
    minutes: 0,
    second: 0,
  });

  const validateNumber = useCallback((answer) => {
    if (NOT_NUMBER.test(answer)) {
      window.alert(MESSAGE.error.notNumber);
      return ERROR_RETURN;
    }
  }, []);

  const validateRange = useCallback((answer, type) => {
    const number = Number(answer);
    const range = RANGE[type];

    if (!Number.isSafeInteger(range) || number < range) {
      window.alert(MESSAGE.error.rangeEach);
      return ERROR_RETURN;
    } else {
      setAnswerTime((curState) => ({ ...curState, [type]: number }));
    }
  }, []);

  const calculateinitialTime = useCallback(() => {
    const { minutes, second } = answerTime;
    const initialTime = minutes * TIME_UNIT + second;

    return initialTime;
  }, [answerTime]);

  const validateTotalTime = useCallback(() => {
    const { min, max } = RANGE;
    const initialTime = calculateinitialTime();

    if (initialTime < min || initialTime > max) {
      window.alert(MESSAGE.error.rangeTotal);
      return ERROR_RETURN;
    }

    return initialTime;
  }, [calculateinitialTime]);

  const validate = useCallback(
    (inputs) => {
      const inputsArr = Object.entries(inputs);

      for (let i = 0; i < inputsArr.length; i += 1) {
        const [type, answer] = inputsArr[i];

        validateNumber(answer);
        validateRange(answer, type);
      }

      return validateTotalTime();
    },
    [validateNumber, validateRange, validateTotalTime],
  );

  return { validate };
}

export default useValidate;
