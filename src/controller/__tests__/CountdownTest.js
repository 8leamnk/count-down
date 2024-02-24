import { act, fireEvent, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import CountdownController from '../CountdownController';

describe('카운트다운 테스트', () => {
  const MINUTE_REGEXP = /MINUTE/;
  const SECOND_REGEXP = /SECOND/;
  const START_BTN = /START/;
  const STOP_BTN = /STOP/;
  const RESTART_BTN = /RESTART/;
  const RESET_BTN = /RESET/;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 가짜 타이머를 사용하고 난 후 원래 타이머로 복원
    jest.useRealTimers();
    // 타이머 제거
    jest.clearAllTimers();
  });

  test('카운트다운에 필요한 요소들 존재 여부 테스트', () => {
    // given
    const TITLE = /TIMER/;
    const SUBTITLE = [/COUNTDOWN/, /PROGRAM/];
    const INITIAL_TIME = /00:00/;
    const LABELS = [MINUTE_REGEXP, SECOND_REGEXP];
    const allTexts = [
      TITLE,
      ...SUBTITLE,
      INITIAL_TIME,
      START_BTN,
      STOP_BTN,
      RESET_BTN,
    ];

    // when
    const { getByText, getByLabelText } = render(
      <RecoilRoot>
        <CountdownController />
      </RecoilRoot>,
    );

    // then
    allTexts.forEach((text) => {
      expect(getByText(text)).toBeInTheDocument();
    });

    LABELS.forEach((label) => {
      expect(getByLabelText(label)).toBeInTheDocument();
    });
  });

  test('예외 테스트', () => {
    // given
    const MINUTE_VALUE = '60';
    const SECOND_VALUE = '-7';
    const NUMBER_ERROR = '0 이상의 숫자를 입력해 주세요.';
    const RANGE_ERROR = '최소 0분 1초, 최대 59분 59초의 시간을 입력해 주세요.';

    // when
    const { getByText, getByLabelText } = render(
      <RecoilRoot>
        <CountdownController />
      </RecoilRoot>,
    );
    const secondInput = getByLabelText(SECOND_REGEXP);
    const startBtn = getByText(START_BTN);

    fireEvent.click(startBtn);

    // then
    expect(getByText(RANGE_ERROR)).toBeInTheDocument();

    // when
    fireEvent.change(secondInput, { target: { value: SECOND_VALUE } });
    fireEvent.click(startBtn);

    // then
    expect(getByText(NUMBER_ERROR)).toBeInTheDocument();

    // when
    const minuteInput = getByLabelText(MINUTE_REGEXP);
    const resetBtn = getByText(RESET_BTN);

    fireEvent.click(resetBtn);
    fireEvent.change(minuteInput, { target: { value: MINUTE_VALUE } });
    fireEvent.click(startBtn);

    // then
    expect(getByText(RANGE_ERROR)).toBeInTheDocument();
  });

  test('input, onChange 테스트', () => {
    // given
    const MINUTE_VALUE = '1';
    const SECOND_VALUE = '7';

    // when
    const { getByLabelText } = render(
      <RecoilRoot>
        <CountdownController />
      </RecoilRoot>,
    );
    const minuteInput = getByLabelText(MINUTE_REGEXP);
    const secondInput = getByLabelText(SECOND_REGEXP);

    fireEvent.change(minuteInput, { target: { value: MINUTE_VALUE } });
    fireEvent.change(secondInput, { target: { value: SECOND_VALUE } });

    // then
    expect(minuteInput.value).toBe(MINUTE_VALUE);
    expect(secondInput.value).toBe(SECOND_VALUE);
  });

  test('카운트다운 동작 테스트', () => {
    // given
    const MINUTE_VALUE = '0';
    const SECOND_VALUE = '67';
    const INITIAL_TIME = /00:00/;
    const SET_TIME = /01:07/;
    const SKIP_TIME = 4000;
    const AFTER_TIME_1 = /01:03/;
    const AFTER_TIME_2 = /00:59/;

    // when
    const { getByText, getByLabelText, queryByText } = render(
      <RecoilRoot>
        <CountdownController />
      </RecoilRoot>,
    );
    const minuteInput = getByLabelText(MINUTE_REGEXP);
    const secondInput = getByLabelText(SECOND_REGEXP);
    const startBtn = getByText(START_BTN);
    const stopBtn = getByText(STOP_BTN);
    const resetBtn = getByText(RESET_BTN);

    fireEvent.change(minuteInput, { target: { value: MINUTE_VALUE } });
    fireEvent.change(secondInput, { target: { value: SECOND_VALUE } });
    fireEvent.click(startBtn);

    // then
    expect(getByText(SET_TIME)).toBeInTheDocument();
    expect(startBtn).toHaveStyle('background-color: #413d3f');
    expect(stopBtn).toHaveStyle('background-color: #ff3215');

    // when
    act(() => {
      jest.advanceTimersByTime(SKIP_TIME);
    });

    // then
    expect(getByText(AFTER_TIME_1)).toBeInTheDocument();

    // when
    fireEvent.click(stopBtn);

    // then
    expect(getByText(AFTER_TIME_1)).toBeInTheDocument();
    expect(queryByText(STOP_BTN)).not.toBeInTheDocument();

    // when
    const restartBtn = getByText(RESTART_BTN);

    fireEvent.click(restartBtn);
    act(() => {
      jest.advanceTimersByTime(SKIP_TIME);
    });

    // then
    expect(getByText(AFTER_TIME_2)).toBeInTheDocument();

    // when
    fireEvent.click(resetBtn);

    // then
    expect(getByText(INITIAL_TIME)).toBeInTheDocument();
    expect(queryByText(RESTART_BTN)).not.toBeInTheDocument();
    expect(stopBtn).toHaveStyle('background-color: #a8b1b2');
    expect(startBtn).toHaveStyle('background-color: #ff3215');
  });
});
