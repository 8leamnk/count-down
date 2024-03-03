import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../Layout/MainLayout';
import Button from '../Atoms/Button';

// style
const S = {};

S.Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => `${theme.fontSize.xLarge}px`};
  font-weight: 700;
  letter-spacing: -0.8px;
  text-align: center;
  margin-bottom: 20px;
`;

S.BackBtn = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.red001};

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => `${theme.fontSize.large}px`};
    font-weight: 900;
  }
`;

function NotFound() {
  return (
    <MainLayout>
      <S.Title>404 Not Found</S.Title>
      <S.BackBtn>
        <Link to="/">Go to home</Link>
      </S.BackBtn>
    </MainLayout>
  );
}

export default NotFound;
