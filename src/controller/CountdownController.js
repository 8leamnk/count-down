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
  const { getInitialTime } = useValidation({ inputs });
  const { time, createTimeId, removeTimeId, handleTime } = useTime();
  const { isStart, handleStart, resetStart } = useStart();
  const { isPause, handlePause, resetPause } = usePause();

  const onStart = useCallback(() => {
    handleStart(getInitialTime, handleTime, createTimeId);
  }, [handleStart, getInitialTime, handleTime, createTimeId]);

  const onPauseOrRestart = useCallback(() => {
    handlePause(createTimeId, removeTimeId);
  }, [handlePause, createTimeId, removeTimeId]);

  const onReset = useCallback(() => {
    resetInputs();
    resetStart();
    resetPause();
    handleTime(0);
    removeTimeId();
  }, [resetInputs, resetStart, resetPause, handleTime, removeTimeId]);

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
