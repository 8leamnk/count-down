import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { popupInfoState } from '../states/popup.states';
import VALUE from '../constants/value';

const ERROR_MESSAGE = Object.freeze({
  notNumber: '숫자만 입력해 주세요.',
  rangeEach: '0 이상의 숫자를 입력해 주세요.',
  rangeTotal: '최소 0분 1초, 최대 59분 59초의 시간을 입력해 주세요.',
});
const RANGE = Object.freeze({
  minutes: 0,
  second: 0,
  min: 1,
  max: 3599 * VALUE.msUnit,
});
const ERROR_INFO = Object.freeze({
  return: 0,
  title: 'ERROR',
});

function useValidation() {
  const setPopupInfo = useSetRecoilState(popupInfoState);

  const validateRange = useCallback((type, answer) => {
    const number = Number(answer);
    const range = RANGE[type];

    if (!Number.isSafeInteger(range) || number < range) {
      throw new Error(ERROR_MESSAGE.rangeEach);
    }

    return number;
  }, []);

  const calculateInitialTime = useCallback((numbers) => {
    const initialTime = numbers.reduce((acc, cur, index) => {
      const exponent = numbers.length - index - 1;
      const number = cur * VALUE.timeUnit ** exponent;

      return acc + number;
    }, 0);

    return initialTime * VALUE.msUnit;
  }, []);

  const validateInitialTime = useCallback(
    (numbers) => {
      const { min, max } = RANGE;
      const initialTime = calculateInitialTime(numbers);

      if (initialTime < min || initialTime > max) {
        throw new Error(ERROR_MESSAGE.rangeTotal);
      }

      return initialTime;
    },
    [calculateInitialTime],
  );

  const validate = useCallback(
    (inputs) => {
      const numbers = [];

      Object.entries(inputs).forEach(([type, answer]) => {
        const number = validateRange(type, answer);

        numbers.push(number);
      });

      return validateInitialTime(numbers);
    },
    [validateRange, validateInitialTime],
  );

  const getInitialTime = useCallback(
    (inputs) => {
      try {
        return validate(inputs);
      } catch (error) {
        setPopupInfo({
          title: ERROR_INFO.title,
          description: error.message,
        });

        return ERROR_INFO.return;
      }
    },
    [validate, setPopupInfo],
  );

  return { getInitialTime };
}

export default useValidation;
