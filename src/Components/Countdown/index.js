import { useCallback, useEffect } from 'react';

// hooks
import useInputs from '../../hooks/useInputs';
import useValidation from '../../hooks/useValidationTime';
import useCountdown from '../../hooks/useCountdown';

// components
import Title from './Title';
import Time from './Time';
import Input from './Input';
import Operation from './Operation';

function Countdown() {
  const { inputs, onChange, resetInputs } = useInputs();
  const { getInitialTime } = useValidation();
  const { time, isStart, isPause, handleStart, handlePause, handleReset } =
    useCountdown();

  const onStart = useCallback(() => {
    if (!isStart) {
      const initialTime = getInitialTime(inputs);
      handleStart(initialTime);
    }
  }, [inputs, isStart, getInitialTime, handleStart]);

  const onPause = useCallback(() => {
    if (isStart) {
      handlePause();
    }
  }, [isStart, handlePause]);

  const onReset = useCallback(() => {
    resetInputs();
    handleReset();
  }, [resetInputs, handleReset]);

  useEffect(() => {
    if (isStart && time === 0) {
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart, time]);

  return (
    <>
      <Title />
      <Time time={time} />
      <Input inputs={inputs} onChange={onChange} />
      <Operation
        isStart={isStart}
        isPause={isPause}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
      />
    </>
  );
}

export default Countdown;
