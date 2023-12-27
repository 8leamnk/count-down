import { renderHook } from '@testing-library/react';
import useValidate from '../useValidate';

window.alert = jest.fn();

describe('입력값 유효성 검사 기능 테스트', () => {
  test.each([
    [{ minutes: '-1', second: '0' }],
    [{ minutes: '0', second: '-1' }],
  ])('각각 0 이상의 숫자를 입력하지 않으면 예외가 발생한다.', (inputs) => {
    // when
    const { result } = renderHook(() => useValidate());
    result.current.getInitialTime(inputs);

    // then
    expect(window.alert).toHaveBeenCalledWith('0 이상의 숫자를 입력해 주세요.');
  });

  test('총 1초 이상의 숫자를 입력하지 않으면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minutes: '0', second: '0' };

    // when
    const { result } = renderHook(() => useValidate());
    result.current.getInitialTime(INPUTS);

    // then
    expect(window.alert).toHaveBeenCalledWith(
      '최소 0분 1초, 최대 59분 59초의 시간을 입력해 주세요.',
    );
  });

  test('총 3600초 이상의 숫자를 입력하면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minutes: '60', second: '0' };

    // when
    const { result } = renderHook(() => useValidate());
    result.current.getInitialTime(INPUTS);

    // then
    expect(window.alert).toHaveBeenCalledWith(
      '최소 0분 1초, 최대 59분 59초의 시간을 입력해 주세요.',
    );
  });
});
