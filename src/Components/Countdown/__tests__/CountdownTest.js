import { act, fireEvent, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Theme from '../../../style/Theme';
import Popup from '../../Common/Popup';
import Countdown from '..';

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
        <Theme>
          <Countdown />
        </Theme>
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
        <Theme>
          <Countdown />
          <Popup />
        </Theme>
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
        <Theme>
          <Countdown />
        </Theme>
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
        <Theme>
          <Countdown />
        </Theme>
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

  test('카운트 다운 종료 시 리셋 함수의 자동 호출 테스트', () => {
    // given
    const MINUTE_VALUE = { first: '', last: '' };
    const SECOND_VALUE = { first: '7', last: '' };
    const INITIAL_TIME = /00:00/;
    const SKIP_TIME = 7000;

    // when
    const { getByText, getByLabelText } = render(
      <RecoilRoot>
        <Theme>
          <Countdown />
        </Theme>
      </RecoilRoot>,
    );
    const minuteInput = getByLabelText(MINUTE_REGEXP);
    const secondInput = getByLabelText(SECOND_REGEXP);
    const startBtn = getByText(START_BTN);

    fireEvent.change(secondInput, { target: { value: SECOND_VALUE.first } });
    fireEvent.click(startBtn);

    // then
    expect(minuteInput.value).toBe(MINUTE_VALUE.first);
    expect(secondInput.value).toBe(SECOND_VALUE.first);

    // when
    act(() => {
      jest.advanceTimersByTime(SKIP_TIME);
    });

    // then
    expect(minuteInput.value).toBe(MINUTE_VALUE.last);
    expect(secondInput.value).toBe(SECOND_VALUE.last);
    expect(getByText(INITIAL_TIME)).toBeInTheDocument();
  });
});
