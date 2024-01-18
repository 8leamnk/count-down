import { useCallback, useEffect } from 'react';

// model
import useInputs from '../domain/useInputs';
import useValidate from '../domain/useValidate';
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
  const { getInitialTime } = useValidate({ inputs });
  const { time, handleTime, createTimeId, removeTimeId } = useTime();
  const { isStart, onStart, handleIsStart } = useStart({
    getInitialTime,
    handleTime,
    createTimeId,
  });
  const { isPause, onPauseOrRestart, handlePause } = usePause({
    createTimeId,
    removeTimeId,
  });

  const onReset = useCallback(() => {
    resetInputs();
    handleTime(0);
    handleIsStart(false);
    handlePause(false);
    removeTimeId();
  }, [resetInputs, handleTime, handleIsStart, handlePause, removeTimeId]);

  useEffect(() => {
    if (isStart && !time) {
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart, time]);

  useEffect(() => {
    return () => {
      removeTimeId();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
