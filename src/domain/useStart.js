import { useCallback, useState } from 'react';

function useStart(createTimeId) {
  const [isStart, setIsStart] = useState(false);

  const handleStart = useCallback((nextState) => setIsStart(nextState), []);

  const onStart = useCallback(() => {
    if (!isStart) {
      handleStart(true);
      createTimeId();
    }
  }, [isStart, handleStart, createTimeId]);

  return { isStart, onStart, handleStart };
}

export default useStart;
