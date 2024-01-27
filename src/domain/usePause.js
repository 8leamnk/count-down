import { useCallback, useState } from 'react';

function usePause() {
  const [isPause, setIsPause] = useState(false);

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

  const resetIsPause = useCallback(() => {
    setIsPause(false);
  }, []);

  return { isPause, handlePause, resetIsPause };
}

export default usePause;
