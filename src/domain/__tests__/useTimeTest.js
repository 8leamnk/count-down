import { renderHook } from '@testing-library/react';
import useTime from '../useTime';
import { act } from 'react-dom/test-utils';

describe('타이머 관리 테스트', () => {
  test('time의 초기값이 제대로 반영 된다.', () => {
    // given
    const INITIAL_TIME = 3000;
    const OUTPUT = 3000;

    // when
    const { result } = renderHook((props) => useTime(props), {
      initialProps: INITIAL_TIME,
    });
    const { time } = result.current;

    // then
    expect(time).toBe(OUTPUT);
  });

  test('카운트 다운이 시작되면 3초 후에 3초만큼 time 상태가 감소한다.', () => {
    // given
    const INITIAL_TIME = 5000;
    const MS = 1000;
    const AFTER_TIME = 3000;
    const OUTPUT = 2000;

    jest.useFakeTimers();

    // when
    const { result } = renderHook((props) => useTime(props), {
      initialProps: INITIAL_TIME,
    });
    result.current.createTimeId(MS);

    // then
    expect(result.current.time).toBe(INITIAL_TIME);
    act(() => {
      jest.advanceTimersByTime(AFTER_TIME);
    });
    expect(result.current.time).toBe(OUTPUT);
    jest.clearAllTimers();
  });
});
