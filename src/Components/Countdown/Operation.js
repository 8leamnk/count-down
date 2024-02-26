import React from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';

// style
const S = {};

S.Wrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 8px;
`;

S.StartBtn = styled(Button)`
  width: 200px;
  flex: none;
  background-color: ${({ theme, $isStart }) =>
    $isStart ? theme.colors.gray007 : theme.colors.red001};
  color: ${({ theme, $isStart }) =>
    $isStart ? theme.colors.gray006 : theme.colors.white};
  font-size: ${({ theme }) => `${theme.fontSize.large}px`};
  font-weight: 900;
  cursor: ${({ $isStart }) => ($isStart ? 'auto' : 'pointer')};
`;

S.PauseBtn = styled(Button)`
  background-color: ${({ theme, $isStart }) =>
    $isStart ? theme.colors.red001 : theme.colors.gray002};
  cursor: ${({ $isStart }) => ($isStart ? 'pointer' : 'auto')};
`;

S.ResetBtn = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gray002};
  cursor: pointer;
`;

const BUTTON_TYPES = Object.freeze({
  start: 'START',
  stop: 'STOP',
  restart: 'RESTART',
  reset: 'RESET',
});

function Operation({ isStart, isPause, onStart, onPause, onReset }) {
  return (
    <S.Wrapper>
      <S.StartBtn $isStart={isStart} onClick={onStart}>
        {BUTTON_TYPES.start}
      </S.StartBtn>

      <S.PauseBtn $isStart={isStart} onClick={onPause}>
        {isPause ? BUTTON_TYPES.restart : BUTTON_TYPES.stop}
      </S.PauseBtn>

      <S.ResetBtn onClick={onReset}>{BUTTON_TYPES.reset}</S.ResetBtn>
    </S.Wrapper>
  );
}

export default React.memo(Operation);
