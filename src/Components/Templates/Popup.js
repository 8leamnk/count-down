import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { popupInfoState, popupOpenedState } from '../../states/popup.states';
import PopupLayout from '../Layout/PopupLayout';
import Title from '../Atoms/Title';
import Description from '../Atoms/Description';
import Button from '../Atoms/Button';

// style
const S = {};

S.Title = styled(Title)`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray008};
  text-align: center;
`;

S.Confirm = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

S.ConfirmBtn = styled(Button)`
  font-size: ${({ theme }) => `${theme.fontSize.large}px`};
  font-weight: 900;
  background-color: ${({ theme }) => theme.colors.gray007};
  cursor: pointer;
`;

function Popup() {
  const popupOpened = useRecoilValue(popupOpenedState);
  const popupInfo = useRecoilValue(popupInfoState);
  const resetPopupInfo = useResetRecoilState(popupInfoState);

  if (popupOpened) {
    return (
      <PopupLayout onClick={resetPopupInfo}>
        <S.Title>{popupInfo.title}</S.Title>

        <Description>{popupInfo.description}</Description>

        <S.Confirm>
          <S.ConfirmBtn onClick={resetPopupInfo}>CONFIRM</S.ConfirmBtn>
        </S.Confirm>
      </PopupLayout>
    );
  }

  return '';
}

export default React.memo(Popup);
