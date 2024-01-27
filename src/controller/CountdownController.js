import { useCallback, useEffect } from 'react';

// model
import useInputs from '../domain/useInputs';
import useValidation from '../domain/useValidation';
import useTime from '../domain/useTime';
import useStart from '../domain/useStart';
import usePause from '../domain/usePause';

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
  const { time, createTimeId, removeTimeId, handleTime } = useTime();
  const { isStart, handleStart, resetIsStart } = useStart();
  const { isPause, handlePause, resetIsPause } = usePause();

  const onStart = () => {
    if (!isStart) {
      const initialTime = getInitialTime(inputs);

      handleStart(initialTime, handleTime, createTimeId);
    }
  };

  const onPauseOrRestart = useCallback(() => {
    if (isStart) {
      handlePause(createTimeId, removeTimeId);
    }
  }, [isStart, handlePause, createTimeId, removeTimeId]);

  const onReset = () => {
    resetInputs();
    resetIsStart();
    resetIsPause();
    handleTime(0);
    removeTimeId();
  };

  useEffect(() => {
    if (isStart && !time) {
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
          onPauseOrRestart={onPauseOrRestart}
          onReset={onReset}
        />
      </MainLayout>
      <Popup />
    </Theme>
  );
}

export default CountdownController;
