import { useCallback, useState } from 'react';
import VALUE from '../constants/value';

function useStart() {
  const [isStart, setIsStart] = useState(false);

  const onStart = useCallback(
    (createTimeId) => {
      if (!isStart) {
        setIsStart(true);
        createTimeId(VALUE.ms);
      }
    },
    [isStart],
  );

  return { isStart, onStart };
}

export default useStart;
