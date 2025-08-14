import { act, renderHook } from '@testing-library/react';
import useValidationTime from '../useValidationTime';
import type { CountdownInputs } from '../../types/countdown';

const ERROR_RETURN = 0;

describe('입력값 유효성 검사 기능 테스트', () => {
  test.each([[{ minute: '-1', second: '0' }], [{ minute: '0', second: '-1' }]])(
    '각각 0 이상의 숫자를 입력하지 않으면 예외가 발생한다.',
    (inputs: CountdownInputs) => {
      // when
      const { result } = renderHook(() => useValidationTime());

      act(() => {
        const initialTime = result.current.getInitialTime(inputs);

        expect(initialTime).toBe(ERROR_RETURN);
      });
    },
  );

  test('총 1초 이상의 숫자를 입력하지 않으면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minute: '0', second: '0' };

    // when
    const { result } = renderHook(() => useValidationTime());

    // then
    act(() => {
      const initialTime = result.current.getInitialTime(INPUTS);

      expect(initialTime).toBe(ERROR_RETURN);
    });
  });

  test('총 6000초 이상의 숫자를 입력하면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minute: '100', second: '0' };

    // when
    const { result } = renderHook(() => useValidationTime());

    // then
    act(() => {
      const initialTime = result.current.getInitialTime(INPUTS);

      expect(initialTime).toBe(ERROR_RETURN);
    });
  });

  test('총 1초 이상 99분 59초 이하의 숫자를 입력하면 예외가 발생하지 않는다.', () => {
    // given
    const MS = 1000;
    const INPUTS = { minute: '99', second: '30' };
    const OUTPUT = 5970 * MS;

    // when
    const { result } = renderHook(() => useValidationTime());

    // then
    act(() => {
      const initialTime = result.current.getInitialTime(INPUTS);

      expect(initialTime).toBe(OUTPUT);
    });
  });
});
