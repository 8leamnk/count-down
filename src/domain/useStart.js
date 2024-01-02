import { useCallback, useState } from 'react';

function useStart({ getInitialTime, handleTime, createTimeId }) {
  const [isStart, setIsStart] = useState(false);

  const handleIsStart = useCallback((nextState) => setIsStart(nextState), []);

  const onStart = useCallback(() => {
    const initialTime = getInitialTime();

    if (!isStart && initialTime) {
      handleIsStart(true);
      handleTime(initialTime);
      createTimeId();
    }
  }, [isStart, handleIsStart, getInitialTime, handleTime, createTimeId]);

  return { isStart, handleIsStart, onStart };
}

export default useStart;
