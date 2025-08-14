import { type ChangeEvent, useEffect, useState } from 'react';

function useInputs<T>(initialInputs: T, resetTrigger: boolean = false) {
  const [inputs, setInputs] = useState<T>(initialInputs);

  const resetInputs = () => {
    setInputs((curState: T) => ({ ...curState, ...initialInputs }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((curState: T) => ({
      ...curState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (resetTrigger) {
      resetInputs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTrigger]);

  return { inputs, onChange, resetInputs };
}

export default useInputs;
