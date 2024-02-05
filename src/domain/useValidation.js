import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { popupInfoState } from '../states/popup.states';
import VALUE from '../constants/value';

const TIME_MAP = new Map([
  ['hour', 0],
  ['minute', 0],
  ['second', 0],
]);
const ERROR_MESSAGE = Object.freeze({
  notNumber: '숫자만 입력해 주세요.',
  rangeEach: '0 이상의 숫자를 입력해 주세요.',
  rangeTotal: '최소 0분 1초, 최대 59분 59초의 시간을 입력해 주세요.',
});
const RANGE = Object.freeze({
  hour: 0,
  minute: 0,
  second: 0,
  min: 1,
  max: 3599,
});
const ERROR_INFO = Object.freeze({
  return: 0,
  title: 'ERROR',
});

function useValidation() {
  const setPopupInfo = useSetRecoilState(popupInfoState);

  const convertToMap = useCallback((inputs) => {
    const inputMap = new Map([...TIME_MAP]);

    Object.entries(inputs).forEach(([type, answer]) => {
      const number = Number(answer);

      if (number) {
        inputMap.set(type, number);
      }
    });

    return inputMap;
  }, []);

  const validateRange = useCallback((key, number) => {
    const range = RANGE[key];

    if (!Number.isSafeInteger(range) || number < range) {
      throw new Error(ERROR_MESSAGE.rangeEach);
    }
  }, []);

  const calculateInitialTime = useCallback((inputMap) => {
    let initialTime = 0;
    let exponent = inputMap.size - 1;

    inputMap.forEach((value) => {
      initialTime += value * VALUE.timeUnit ** exponent;
      exponent -= 1;
    });

    return initialTime;
  }, []);

  const validateInitialTime = useCallback(
    (inputMap) => {
      const { min, max } = RANGE;
      const initialTime = calculateInitialTime(inputMap);

      if (initialTime < min || initialTime > max) {
        throw new Error(ERROR_MESSAGE.rangeTotal);
      }

      return initialTime * VALUE.msUnit;
    },
    [calculateInitialTime],
  );

  const validate = useCallback(
    (inputs) => {
      const inputMap = convertToMap(inputs);

      inputMap.forEach((number, key) => {
        validateRange(key, number);
      });

      return validateInitialTime(inputMap);
    },
    [convertToMap, validateRange, validateInitialTime],
  );

  const getInitialTime = useCallback(
    (inputs) => {
      try {
        return validate(inputs);
      } catch (error) {
        setPopupInfo({ title: ERROR_INFO.title, description: error.message });

        return ERROR_INFO.return;
      }
    },
    [validate, setPopupInfo],
  );

  return { getInitialTime };
}

export default useValidation;
