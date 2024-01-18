import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useValidate from '../useValidate';

const ERROR_RETURN = 0;

describe('입력값 유효성 검사 기능 테스트', () => {
  test.each([
    [{ minutes: '-1', second: '0' }],
    [{ minutes: '0', second: '-1' }],
  ])('각각 0 이상의 숫자를 입력하지 않으면 예외가 발생한다.', (inputs) => {
    // when
    const { result } = renderHook((props) => useValidate(props), {
      wrapper: RecoilRoot,
      initialProps: { inputs },
    });

    act(() => {
      const initialTime = result.current.getInitialTime();

      expect(initialTime).toBe(ERROR_RETURN);
    });
  });

  test('총 1초 이상의 숫자를 입력하지 않으면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minutes: '0', second: '0' };

    // when
    const { result } = renderHook((props) => useValidate(props), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
      initialProps: { inputs: INPUTS },
    });

    // then
    act(() => {
      const initialTime = result.current.getInitialTime();

      expect(initialTime).toBe(ERROR_RETURN);
    });
  });

  test('총 3600초 이상의 숫자를 입력하면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minutes: '60', second: '0' };

    // when
    const { result } = renderHook((props) => useValidate(props), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
      initialProps: { inputs: INPUTS },
    });

    // then
    act(() => {
      const initialTime = result.current.getInitialTime();

      expect(initialTime).toBe(ERROR_RETURN);
    });
  });

  test('총 1초 이상 59분 59초 이하의 숫자를 입력하면 예외가 발생하지 않는다.', () => {
    // given
    const INPUTS = { minutes: '1', second: '30' };
    const OUTPUT = 90000;

    // when
    const { result } = renderHook((props) => useValidate(props), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
      initialProps: { inputs: INPUTS },
    });

    // then
    act(() => {
      const initialTime = result.current.getInitialTime();

      expect(initialTime).toBe(OUTPUT);
    });
  });
});
