import { useQueryClient } from '@tanstack/react-query';
import VALUE from '../constants/value';
import { POPUP_INFO_KEY } from '../constants/queryKeys';

const TIME_MAP = new Map([
  ['hour', 0],
  ['minute', 0],
  ['second', 0],
]);
const ERROR_MESSAGE = Object.freeze({
  notNumber: '숫자만 입력해 주세요.',
  rangeEach: '0 이상의 숫자를 입력해 주세요.',
  rangeTotal: '최소 0분 1초, 최대 99분 59초의 시간을 입력해 주세요.',
});
const RANGE = Object.freeze({
  hour: 0,
  minute: 0,
  second: 0,
  min: 1,
  max: 5999,
});
const ERROR_INFO = Object.freeze({
  return: 0,
  title: 'ERROR',
});

function useValidationTime() {
  const queryClient = useQueryClient();

  const convertToMap = (inputs) => {
    const inputMap = new Map([...TIME_MAP]);

    Object.entries(inputs).forEach(([type, answer]) => {
      const number = Number(answer);

      if (number) {
        inputMap.set(type, number);
      }
    });

    return inputMap;
  };

  const validateRange = (key, number) => {
    const range = RANGE[key];

    if (!Number.isSafeInteger(range) || number < range) {
      throw new Error(ERROR_MESSAGE.rangeEach);
    }
  };

  const calculateInitialTime = (inputMap) => {
    let initialTime = 0;
    let exponent = inputMap.size - 1;

    inputMap.forEach((value) => {
      initialTime += value * VALUE.timeUnit ** exponent;
      exponent -= 1;
    });

    return initialTime;
  };

  const validateInitialTime = (inputMap) => {
    const { min, max } = RANGE;
    const initialTime = calculateInitialTime(inputMap);

    if (initialTime < min || initialTime > max) {
      throw new Error(ERROR_MESSAGE.rangeTotal);
    }

    return initialTime * VALUE.msUnit;
  };

  const validate = (inputs) => {
    const inputMap = convertToMap(inputs);

    inputMap.forEach((number, key) => {
      validateRange(key, number);
    });

    return validateInitialTime(inputMap);
  };

  const getInitialTime = (inputs) => {
    try {
      return validate(inputs);
    } catch (error) {
      queryClient.setQueryData([POPUP_INFO_KEY], {
        title: ERROR_INFO.title,
        description: error.message,
      });

      return ERROR_INFO.return;
    }
  };

  return { getInitialTime };
}

export default useValidationTime;
