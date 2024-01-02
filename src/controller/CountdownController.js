import { useCallback, useEffect } from 'react';

// model
import useValidate from '../domain/useValidate';
import useTime from '../domain/useTime';
import useStart from '../domain/useStart';
import usePause from '../domain/usePause';

// view
import useInputs from '../view/Input/useInputs';

function CountdownController() {
  const { inputs, onChange } = useInputs();
  const { getInitialTime } = useValidate();
  const { time, handleTime, createTimeId, removeTimeId } = useTime();
  const { isStart, handleStartCountdown, handleStart } = useStart({
    handleTime,
    createTimeId,
  });
  const { isPause, onPauseOrRestart, handlePause } = usePause({
    createTimeId,
    removeTimeId,
  });

  const onStart = useCallback(() => {
    const initialTime = getInitialTime(inputs);

    handleStartCountdown(initialTime);
  }, [inputs, getInitialTime, handleStartCountdown]);

  const onReset = useCallback(() => {
    handleTime(0);
    handleStart(false);
    handlePause(false);
    removeTimeId();
  }, [handleTime, handleStart, handlePause, removeTimeId]);

  useEffect(() => {
    if (isStart && !time) {
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart, time]);

  return '';
}

export default CountdownController;
