import { act, renderHook } from '@testing-library/react';
import usePause from '../usePause';

const createTimeId = jest.fn();
const removeTimeId = jest.fn();

describe('일시정지, 재시작 기능 테스트', () => {
  test('버튼을 처음 누르면 일시 정지 상태값이 true이고 두번째 누르면 false이다.', () => {
    // given
    const PAUSE_TRUE = true;
    const PAUSE_FALSE = false;

    // when
    const { result } = renderHook((props) => usePause(props), {
      initialProps: { createTimeId, removeTimeId },
    });

    act(() => {
      result.current.handlePauseOrRestart();
    });

    // then
    expect(result.current.isPause).toBe(PAUSE_TRUE);
    act(() => {
      result.current.handlePauseOrRestart();
    });
    expect(result.current.isPause).toBe(PAUSE_FALSE);
  });
});
