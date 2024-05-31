import styled, { css } from 'styled-components';
import { mobile } from '../../style/mediaQuery';

const S = {};

S.Button = styled.button`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.base}px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  ${mobile(css`
    width: 100%;
    flex: none;
  `)}
`;

function Button({ children, ...rest }) {
  return <S.Button {...rest}>{children}</S.Button>;
}

export default Button;
