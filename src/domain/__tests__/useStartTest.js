import { act, renderHook } from '@testing-library/react';
import useStart from '../useStart';

const handleTime = jest.fn();
const createTimeId = jest.fn();

describe('시작 기능 테스트', () => {
  test('시간 값이 0이면 카운트 다운을 시작하지 않는다.', () => {
    // given
    const INITIAL_TIME = 0;
    const IS_START = false;
    const CALLED_TIMES = 0;

    // when
    const { result } = renderHook((props) => useStart(props), {
      initialProps: { handleTime, createTimeId },
    });

    act(() => {
      result.current.handleStartCountdown(INITIAL_TIME);
    });

    // then
    expect(result.current.isStart).toBe(IS_START);
    expect(handleTime).toHaveBeenCalledTimes(CALLED_TIMES);
  });

  test('시간 값이 1000 이상이면 카운트 다운을 시작한다.', () => {
    // given
    const INITIAL_TIME = 2000;
    const IS_START = true;
    const CALLED_TIMES = 1;

    // when
    const { result } = renderHook((props) => useStart(props), {
      initialProps: { handleTime, createTimeId },
    });

    act(() => {
      result.current.handleStartCountdown(INITIAL_TIME);
    });

    // then
    expect(result.current.isStart).toBe(IS_START);
    expect(handleTime).toHaveBeenCalledWith(INITIAL_TIME);
    expect(handleTime).toHaveBeenCalledTimes(CALLED_TIMES);
  });
});