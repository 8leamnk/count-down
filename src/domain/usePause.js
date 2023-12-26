import { useCallback, useState } from 'react';

function usePause({ createTimeId, removeTimeId }) {
  const [isPause, setIsPause] = useState(false);

  const handlePause = useCallback((nextState) => setIsPause(nextState), []);

  const handlePauseOrRestart = useCallback(() => {
    if (isPause) {
      handlePause(false);
      createTimeId();
    } else {
      handlePause(true);
      removeTimeId();
    }
  }, [isPause, handlePause, createTimeId, removeTimeId]);

  return { isPause, handlePauseOrRestart, handlePause };
}

export default usePause;
