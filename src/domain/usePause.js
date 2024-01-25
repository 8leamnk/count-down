import { useCallback, useState } from 'react';

function usePause() {
  const [isPause, setIsPause] = useState(false);

  const resetPause = useCallback(() => {
    setIsPause(false);
  }, []);

  const handlePause = useCallback(
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

  return { isPause, handlePause, resetPause };
}

export default usePause;
