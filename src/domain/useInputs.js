import { useCallback, useState } from 'react';

const INITIAL_INPUTS = Object.freeze({ minutes: '', second: '' });

function useInputs() {
  const [inputs, setInputs] = useState(INITIAL_INPUTS);

  const resetInputs = useCallback(() => {
    setInputs((curState) => ({ ...curState, ...INITIAL_INPUTS }));
  }, []);

  const onChange = useCallback((e) => {
    setInputs((curState) => ({ ...curState, [e.target.name]: e.target.value }));
  }, []);

  return { inputs, onChange, resetInputs };
}

export default useInputs;
