import type { CountdownInputs, InputKey } from '@/types/countdown';
import { useModalInfo } from '@/store/modal';
import { UNIT } from '../constants/global';

type CountdownMapData = Map<InputKey, number | string>;

const TIME_MAP: CountdownMapData = new Map([
  ['minute', 0],
  ['second', 0],
]);
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
const ERROR_MESSAGE = Object.freeze({
  notNumber: '숫자만 입력해 주세요.',
  rangeEach: '0 이상의 숫자를 입력해 주세요.',
  rangeTotal: '최소 0분 1초, 최대 99분 59초의 시간을 입력해 주세요.',
});

function useValidationTime() {
  const { openModal } = useModalInfo();

  const convertToMap = (inputs: CountdownInputs): CountdownMapData => {
    const inputMap = new Map(Array.from(TIME_MAP));

    Object.entries(inputs).forEach(([type, answer]) => {
      const number = Number(answer);

      if (number) {
        inputMap.set(type as InputKey, number);
      }
    });

    return inputMap;
  };

  const validateRange = (key: InputKey, number: number) => {
    const range = RANGE[key];

    if (!Number.isSafeInteger(range) || number < range) {
      throw new Error(ERROR_MESSAGE.rangeEach);
    }
  };

  const calculateInitialTime = (inputMap: CountdownMapData) => {
    let initialTime = 0;
    let exponent = inputMap.size - 1;

    inputMap.forEach((value) => {
      initialTime += (value as number) * UNIT.timeUnit ** exponent;
      exponent -= 1;
    });

    return initialTime;
  };

  const validateInitialTime = (inputMap: CountdownMapData) => {
    const { min, max } = RANGE;
    const initialTime = calculateInitialTime(inputMap);

    if (initialTime < min || initialTime > max) {
      throw new Error(ERROR_MESSAGE.rangeTotal);
    }

    return initialTime * UNIT.msUnit;
  };

  const validate = (inputs: CountdownInputs) => {
    const inputMap = convertToMap(inputs);

    inputMap.forEach((number, key) => {
      validateRange(key, number as number);
    });

    return validateInitialTime(inputMap);
  };

  const getInitialTime = (inputs: CountdownInputs) => {
    try {
      return validate(inputs);
    } catch (error) {
      if (error instanceof Error) {
        openModal({
          title: ERROR_INFO.title,
          description: error.message,
        });
      }

      return ERROR_INFO.return;
    }
  };

  return { getInitialTime };
}

export default useValidationTime;
