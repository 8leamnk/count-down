import styled from 'styled-components';

// style
const S = {};

S.Label = styled.label`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.base}px;
  font-weight: 400;
  letter-spacing: -0.4px;
`;

S.LabelText = styled.span`
  display: inline-block;
  margin-bottom: 4px;
`;

function Label({ labelText, children, ...rest }) {
  return (
    <S.Label {...rest}>
      <S.LabelText>{labelText}</S.LabelText>
      {children}
    </S.Label>
  );
}

export default Label;
