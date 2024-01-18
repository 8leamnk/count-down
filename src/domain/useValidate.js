import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { popupInfoState } from '../states/popup.states';
import MESSAGE from '../constants/message';
import VALUE from '../constants/value';

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

function useValidate({ inputs }) {
  const setPopupInfo = useSetRecoilState(popupInfoState);

  const validateRange = useCallback((answer, type) => {
    const number = Number(answer);
    const range = RANGE[type];

    if (!Number.isSafeInteger(range) || number < range) {
      throw new Error(MESSAGE.error.rangeEach);
    }

    return number;
  }, []);

  const calculateinitialTime = useCallback((values) => {
    const [minutes, second] = values;
    const initialTime = minutes * VALUE.timeUnit + second;

    return initialTime * VALUE.msUnit;
  }, []);

  const validateTotalTime = useCallback(
    (inputsMap) => {
      const { min, max } = RANGE;
      const initialTime = calculateinitialTime(inputsMap);

      if (initialTime < min || initialTime > max) {
        throw new Error(MESSAGE.error.rangeTotal);
      }

      return initialTime;
    },
    [calculateinitialTime],
  );

  const validate = useCallback(() => {
    const inputsMap = new Map(Object.entries(inputs));

    inputsMap.forEach((answer, type) => {
      const number = validateRange(answer, type);
      inputsMap.set(type, number);
    });

    return validateTotalTime([...inputsMap.values()]);
  }, [inputs, validateRange, validateTotalTime]);

  const getInitialTime = useCallback(() => {
    try {
      return validate();
    } catch (error) {
      setPopupInfo({
        title: ERROR_INFO.title,
        description: error.message,
      });
      return ERROR_INFO.return;
    }
  }, [validate, setPopupInfo]);

  return { getInitialTime };
}

export default useValidate;
