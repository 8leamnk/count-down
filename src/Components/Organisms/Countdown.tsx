import type { CountdownInputs } from '@/types/countdown';

// hooks
import useInputs from '../../hooks/useInputs';
import useValidation from '../../hooks/useValidationTime';
import useCountdown from '../../hooks/useCountdown';

// components
import Subject from '../Molecules/Subject';
import Time from '../Molecules/Time';
import Inputs from '../Molecules/Inputs';
import Operation from '../Molecules/Operation';

// constants
import { PROJECT_NAME } from '@/constants/global';

const INITIAL_INPUTS: CountdownInputs = { minute: '', second: '' };

function Countdown() {
  const { getInitialTime } = useValidation();
  const { time, isStart, isPause, handleStart, handlePause, handleReset } =
    useCountdown();
  const { inputs, onChange, resetInputs } = useInputs(
    INITIAL_INPUTS,
    isStart && time === 0,
  );

  return (
    <>
      <Subject title={PROJECT_NAME.title} subTitle={PROJECT_NAME.subTitle} />
      <Time time={time} />
      <Inputs
        inputs={inputs}
        type="number"
        placeholder="00"
        onChange={onChange}
      />
      <Operation
        isStart={isStart}
        isPause={isPause}
        onStart={() => {
          if (!isStart) {
            const initialTime = getInitialTime(inputs);
            handleStart(initialTime);
          }
        }}
        onPause={handlePause}
        onReset={() => {
          resetInputs();
          handleReset();
        }}
      />
    </>
  );
}

export default Countdown;
