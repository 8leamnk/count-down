import { useCallback, useState } from 'react';

const INITIAL_INPUTS = Object.freeze({ minutes: '', second: '' });

function useInputs() {
  const [inputs, setInputs] = useState(INITIAL_INPUTS);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setInputs({ ...inputs, [name]: value });
    },
    [inputs],
  );

  return { inputs, onChange };
}

export default useInputs;
