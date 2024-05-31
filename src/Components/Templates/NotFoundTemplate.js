import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../Layout/MainLayout';
import Title from '../Atoms/Title';
import Button from '../Atoms/Button';

// style
const S = {};

S.Title = styled(Title)`
  text-align: center;
  margin-bottom: 20px;
`;

S.BackBtn = styled(Button)`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.large}px;
  font-weight: 900;
  background-color: ${({ theme }) => theme.colors.red001};
  cursor: pointer;
`;

function NotFoundTemplate() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <S.Title>404 Not Found</S.Title>
      <S.BackBtn onClick={() => navigate(-1)}>Go back</S.BackBtn>
    </MainLayout>
  );
}

export default NotFoundTemplate;
