import { act, renderHook, waitFor } from '@testing-library/react';
import useCountdown from '../useCountdown';

describe('타이머 관리 테스트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test('time의 초기값이 제대로 반영 되고 시작 상태가 true가 된다.', () => {
    // given
    const INITIAL_TIME = 3000;
    const IS_START = true;
    const TIME = 3000;

    // when
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.handleStart(INITIAL_TIME);
    });

    // then
    expect(result.current.isStart).toBe(IS_START);
    expect(result.current.time).toBe(TIME);
  });

  test('카운트 다운이 시작되면 3초 후에 3초만큼 time 상태가 감소한다.', () => {
    // given
    const INITIAL_TIME = 5000;
    const AFTER_TIME = 3000;
    const OUTPUT = 2000;

    // when
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.handleStart(INITIAL_TIME);
      jest.advanceTimersByTime(AFTER_TIME);
    });

    // then
    expect(result.current.time).toBe(OUTPUT);
  });

  test('카운트 다운이 시작되고 3초 후에 일시정지하면 타이머도 멈춘다.', async () => {
    // given
    const INITIAL_TIME = 7000;
    const AFTER_TIME = 3000;
    const TIMEOUT = 2000;
    const IS_PAUSE = true;
    const TIME = 4000;
    const NOT_TIME = 2000;

    // when
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.handleStart(INITIAL_TIME);
      jest.advanceTimersByTime(AFTER_TIME);
      result.current.handlePause(INITIAL_TIME);
    });

    // then
    expect(result.current.isPause).toBe(IS_PAUSE);
    expect(result.current.time).toBe(TIME);

    await waitFor(
      () => {
        expect(result.current.time).not.toBe(NOT_TIME);
      },
      { timeout: TIMEOUT },
    );
  });

  test('타이머가 다 끝나기도 전에 리셋 버튼을 누르면 time이 0이 되고 start, pause 상태가 false가 된다.', () => {
    // given
    const INITIAL_TIME = 7000;
    const AFTER_TIME = 3000;
    const IS_START = false;
    const IS_PAUSE = false;
    const TIME = 0;

    // when
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.handleStart(INITIAL_TIME);
      jest.advanceTimersByTime(AFTER_TIME);
      result.current.handleReset();
    });

    // then
    expect(result.current.isStart).toBe(IS_START);
    expect(result.current.isPause).toBe(IS_PAUSE);
    expect(result.current.time).toBe(TIME);
  });

  test('타이머가 다 끝나면 리셋 되어 time이 0이 되고 start, pause 상태가 false가 된다.', () => {
    // given
    const INITIAL_TIME = 5000;
    const AFTER_TIME = 5000;
    const IS_START = false;
    const IS_PAUSE = false;
    const TIME = 0;

    // when
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.handleStart(INITIAL_TIME);
      jest.advanceTimersByTime(AFTER_TIME);
    });

    // then
    expect(result.current.isStart).toBe(IS_START);
    expect(result.current.isPause).toBe(IS_PAUSE);
    expect(result.current.time).toBe(TIME);
  });
});
