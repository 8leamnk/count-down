import { useState } from 'react';

const INITIAL_INPUTS = Object.freeze({ minute: '', second: '' });

function useInputs() {
  const [inputs, setInputs] = useState(INITIAL_INPUTS);

  const resetInputs = () => {
    setInputs((curState) => ({ ...curState, ...INITIAL_INPUTS }));
  };

  const onChange = (e) => {
    setInputs((curState) => ({ ...curState, [e.target.name]: e.target.value }));
  };

  return { inputs, onChange, resetInputs };
}

export default useInputs;
