import { useModalInfo } from '@/store/modal';
import styled from 'styled-components';
import ModalLayout from '../Layout/ModalLayout';
import Title from '../Atoms/Title';
import Description from '../Atoms/Description';
import Button from '../Atoms/Button';

// style
const S = {
  Title: styled(Title)`
    width: 100%;
    color: ${({ theme }) => theme.colors.gray008};
    text-align: center;
  `,

  Confirm: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,

  ConfirmBtn: styled(Button)`
    font-size: ${({ theme }) => theme.fontSize.large}px;
    font-weight: 900;
    background-color: ${({ theme }) => theme.colors.gray007};
    cursor: pointer;
  `,
};

function Modal() {
  const { modalInfo, closeModal } = useModalInfo();

  if (modalInfo) {
    return (
      <ModalLayout onClick={closeModal}>
        <S.Title>{modalInfo.title}</S.Title>

        <Description>{modalInfo.description}</Description>

        <S.Confirm>
          <S.ConfirmBtn onClick={closeModal}>CONFIRM</S.ConfirmBtn>
        </S.Confirm>
      </ModalLayout>
    );
  }

  return '';
}

export default Modal;
