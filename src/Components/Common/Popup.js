import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import Button from './Button';
import { popupInfoState, popupOpenedState } from '../../states/popup.states';

// style
const S = {};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

S.Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  animation: ${fadeIn} 0.15s;
`;

S.Inner = styled.div`
  width: 416px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  box-shadow: 3px 6px 9px 0 rgba(0, 0, 0, 0.16);
`;

S.Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray008};
  font-size: ${({ theme }) => `${theme.fontSize.xLarge}px`};
  font-weight: 700;
  letter-spacing: -0.8px;
  padding: 20px;
  box-sizing: border-box;
`;

S.Description = styled.h2`
  width: 100%;
  font-family: 'Pretendard', sans-serif;
  color: ${({ theme }) => theme.colors.gray008};
  font-size: ${({ theme }) => `${theme.fontSize.base}px`};
  font-weight: 400;
  padding: 20px;
  box-sizing: border-box;
`;

S.Confirm = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

S.ConfirmBtn = styled(Button)`
  font-size: ${({ theme }) => `${theme.fontSize.large}px`};
  font-weight: 900;
  background-color: ${({ theme }) => theme.colors.gray007};
  cursor: pointer;
`;

const CONFIRM_BTN_TEXT = 'CONFIRM';

function Popup() {
  const popupOpened = useRecoilValue(popupOpenedState);
  const popupInfo = useRecoilValue(popupInfoState);
  const resetPopupInfo = useResetRecoilState(popupInfoState);

  if (popupOpened) {
    return (
      <S.Wrapper onClick={resetPopupInfo}>
        <S.Inner onClick={(e) => e.stopPropagation()}>
          <S.Title>{popupInfo.title}</S.Title>
          <S.Description>{popupInfo.description}</S.Description>
          <S.Confirm>
            <S.ConfirmBtn onClick={resetPopupInfo}>
              {CONFIRM_BTN_TEXT}
            </S.ConfirmBtn>
          </S.Confirm>
        </S.Inner>
      </S.Wrapper>
    );
  }

  return '';
}

export default React.memo(Popup);
