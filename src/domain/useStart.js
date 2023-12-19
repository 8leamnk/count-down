import { useCallback, useState } from 'react';

function useStart() {
  const [isStart, setIsStart] = useState(false);

  const onStart = useCallback(
    (createTimeId) => {
      if (!isStart) {
        setIsStart(true);
        createTimeId();
      }
    },
    [isStart],
  );

  return { isStart, onStart };
}

export default useStart;
