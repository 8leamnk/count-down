import { renderHook } from '@testing-library/react';
import useValidate from '../useValidate';

const handlePopup = jest.fn();
const ERROR_NUMBER = Object.freeze({
  title: 'ERROR',
  description: '0 이상의 숫자를 입력해 주세요.',
});
const ERROR_RANGE = Object.freeze({
  title: 'ERROR',
  description: '최소 0분 1초, 최대 59분 59초의 시간을 입력해 주세요.',
});
const ERROR_RETURN = 0;

describe('입력값 유효성 검사 기능 테스트', () => {
  test.each([
    [{ minutes: '-1', second: '0' }],
    [{ minutes: '0', second: '-1' }],
  ])('각각 0 이상의 숫자를 입력하지 않으면 예외가 발생한다.', (inputs) => {
    // when
    const { result } = renderHook((props) => useValidate(props), {
      initialProps: { inputs, handlePopup },
    });
    const initialTime = result.current.getInitialTime();

    // then
    expect(handlePopup).toHaveBeenCalledWith(ERROR_NUMBER);
    expect(initialTime).toBe(ERROR_RETURN);
  });

  test('총 1초 이상의 숫자를 입력하지 않으면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minutes: '0', second: '0' };

    // when
    const { result } = renderHook((props) => useValidate(props), {
      initialProps: { inputs: INPUTS, handlePopup },
    });
    const initialTime = result.current.getInitialTime();

    // then
    expect(handlePopup).toHaveBeenCalledWith(ERROR_RANGE);
    expect(initialTime).toBe(ERROR_RETURN);
  });

  test('총 3600초 이상의 숫자를 입력하면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minutes: '60', second: '0' };

    // when
    const { result } = renderHook((props) => useValidate(props), {
      initialProps: { inputs: INPUTS, handlePopup },
    });
    const initialTime = result.current.getInitialTime();

    // then
    expect(handlePopup).toHaveBeenCalledWith(ERROR_RANGE);
    expect(initialTime).toBe(ERROR_RETURN);
  });
});
