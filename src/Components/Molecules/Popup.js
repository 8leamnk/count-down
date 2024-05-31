import { useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import PopupLayout from '../Layout/PopupLayout';
import Title from '../Atoms/Title';
import Description from '../Atoms/Description';
import Button from '../Atoms/Button';
import { POPUP_INFO_KEY, POPUP_OPENED_KEY } from '../../constants/queryKeys';

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
  font-size: ${({ theme }) => theme.fontSize.large}px;
  font-weight: 900;
  background-color: ${({ theme }) => theme.colors.gray007};
  cursor: pointer;
`;

function Popup() {
  const queryClient = useQueryClient();

  const { data: popupInfo } = useQuery({
    queryKey: [POPUP_INFO_KEY],
    initialData: { title: '', description: '' },
    staleTime: Infinity,
  });

  const { data: popupOpened } = useQuery({
    queryKey: [POPUP_OPENED_KEY, popupInfo],
    initialData: popupInfo.title !== '' && popupInfo.description !== '',
    staleTime: Infinity,
  });

  const resetPopupInfo = () => {
    queryClient.resetQueries({ queryKey: [POPUP_INFO_KEY], exact: true });
  };

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

export default Popup;
