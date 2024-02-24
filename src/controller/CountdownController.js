import { useCallback, useEffect } from 'react';

// model
import useInputs from '../domain/useInputs';
import useValidation from '../domain/useValidation';
import useCountdown from '../domain/useCountdown';

// view
import MainLayout from '../view/Layout/MainLayout';
import Title from '../view/OutputView/Title';
import Time from '../view/OutputView/Time';
import InputView from '../view/InputView';
import Operation from '../view/OutputView/Operation';
import Popup from '../view/OutputView/Popup';

// style
import Theme from '../style/Theme';

function CountdownController() {
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
    <Theme>
      <MainLayout>
        <Title />
        <Time time={time} />
        <InputView inputs={inputs} onChange={onChange} />
        <Operation
          isStart={isStart}
          isPause={isPause}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
        />
      </MainLayout>
      <Popup />
    </Theme>
  );
}

export default CountdownController;
