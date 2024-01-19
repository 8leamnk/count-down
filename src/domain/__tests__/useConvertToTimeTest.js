import { renderHook } from '@testing-library/react';
import useConvertToTime from '../useConvertToTime';

describe('시간 변환 테스트', () => {
  test.each([
    [777000, '12:57'],
    [70000, '01:10'],
    [7000, '00:07'],
  ])('숫자가 00:00 형태로 표시 된다.', (input, output) => {
    // when
    const { result } = renderHook(() => useConvertToTime());
    const { convertToTime } = result.current;

    // then
    expect(convertToTime(input)).toBe(output);
  });
});
