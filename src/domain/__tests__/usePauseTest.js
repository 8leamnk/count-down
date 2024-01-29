import { act, renderHook } from '@testing-library/react';
import usePause from '../usePause';

createTimeId = jest.fn();
removeTimeId = jest.fn();

describe('일시정지, 재시작 기능 테스트', () => {
  test('버튼을 처음 누르면 일시 정지 상태값이 true이고 두번째 누르면 false이다.', () => {
    // given
    const NOT_ONCE = 0;
    const ONCE = 1;
    const TWICE = 2;

    // when
    const { result } = renderHook((props) => usePause(props));

    act(() => {
      result.current.handlePause(createTimeId, removeTimeId);
    });

    // then
    expect(createTimeId).toHaveBeenCalledTimes(NOT_ONCE);
    expect(removeTimeId).toHaveBeenCalledTimes(ONCE);
    expect(result.current.isPause).toBe(true);

    // when
    act(() => {
      result.current.handlePause(createTimeId, removeTimeId);
    });

    // then
    expect(createTimeId).toHaveBeenCalledTimes(ONCE);
    expect(removeTimeId).toHaveBeenCalledTimes(ONCE);
    expect(result.current.isPause).toBe(false);

    // when
    act(() => {
      result.current.handlePause(createTimeId, removeTimeId);
    });

    // then
    expect(createTimeId).toHaveBeenCalledTimes(ONCE);
    expect(removeTimeId).toHaveBeenCalledTimes(TWICE);
    expect(result.current.isPause).toBe(true);
  });
});
