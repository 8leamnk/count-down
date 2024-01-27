import { useCallback, useState } from 'react';

function useStart() {
  const [isStart, setIsStart] = useState(false);

  const handleStart = useCallback((initialTime, handleTime, createTimeId) => {
    if (initialTime > 0) {
      setIsStart(true);
      handleTime(initialTime);
      createTimeId();
    }
  }, []);

  const resetIsStart = useCallback(() => {
    setIsStart(false);
  }, []);

  return { isStart, handleStart, resetIsStart };
}

export default useStart;
