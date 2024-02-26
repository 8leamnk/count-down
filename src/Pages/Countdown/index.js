import { useCallback, useEffect } from 'react';

// hooks
import useInputs from '../../hooks/useInputs';
import useValidation from '../../hooks/useValidationTime';
import useCountdown from '../../hooks/useCountdown';

// components
import MainLayout from '../../Components/Layout/MainLayout';
import Title from '../../Components/Countdown/Title';
import Time from '../../Components/Countdown/Time';
import Input from '../../Components/Countdown/Input';
import Operation from '../../Components/Countdown/Operation';
import Popup from '../../Components/Countdown/Popup';

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
      <MainLayout>
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
      </MainLayout>
      <Popup />
    </>
  );
}

export default Countdown;
