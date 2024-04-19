import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useValidationTime from '../useValidationTime';

const ERROR_RETURN = 0;

describe('입력값 유효성 검사 기능 테스트', () => {
  const queryClient = new QueryClient();

  test.each([[{ minute: '-1', second: '0' }], [{ minute: '0', second: '-1' }]])(
    '각각 0 이상의 숫자를 입력하지 않으면 예외가 발생한다.',
    (inputs) => {
      // when
      const { result } = renderHook((props) => useValidationTime(props), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

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
    const { result } = renderHook((props) => useValidationTime(props), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    // then
    act(() => {
      const initialTime = result.current.getInitialTime(INPUTS);

      expect(initialTime).toBe(ERROR_RETURN);
    });
  });

  test('총 3600초 이상의 숫자를 입력하면 예외가 발생한다.', () => {
    // given
    const INPUTS = { minute: '60', second: '0' };

    // when
    const { result } = renderHook((props) => useValidationTime(props), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    // then
    act(() => {
      const initialTime = result.current.getInitialTime(INPUTS);

      expect(initialTime).toBe(ERROR_RETURN);
    });
  });

  test('총 1초 이상 59분 59초 이하의 숫자를 입력하면 예외가 발생하지 않는다.', () => {
    // given
    const INPUTS = { minute: '1', second: '30' };
    const OUTPUT = 90000;

    // when
    const { result } = renderHook((props) => useValidationTime(props), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    // then
    act(() => {
      const initialTime = result.current.getInitialTime(INPUTS);

      expect(initialTime).toBe(OUTPUT);
    });
  });
});
