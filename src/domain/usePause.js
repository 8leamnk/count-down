import { useCallback, useState } from 'react';

function usePause() {
  const [isPause, setIsPause] = useState(false);

  const onPauseOrRestart = useCallback(
    (createTimeId, removeTimeId) => {
      if (isPause) {
        setIsPause(false);
        createTimeId();
      } else {
        setIsPause(true);
        removeTimeId();
      }
    },
    [isPause],
  );

  return { isPause, onPauseOrRestart };
}

export default usePause;
