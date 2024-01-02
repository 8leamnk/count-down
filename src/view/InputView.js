import React from 'react';
import styled from 'styled-components';
import BoxLayout from './Layout/BoxLayout';
import Input from './Components/Input';

// style
const S = {};

S.Wrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

S.Label = styled.label`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => `${theme.fontSize.base}px`};
  font-weight: 400;
  letter-spacing: -0.4px;
`;

S.LabelText = styled.span`
  display: inline-block;
  margin-bottom: 4px;
`;

S.Input = styled(Input).attrs({
  type: 'number',
  placeholder: '00',
})``;

const OPTIONS = Object.freeze({
  padding: { outer: 4, inner: 12 },
  radius: 8,
  height: 52,
});

function InputView({ inputs, onChange }) {
  return (
    <S.Wrapper>
      {Object.entries(inputs).map(([inputKey, number]) => (
        <S.Label key={inputKey}>
          <S.LabelText>{inputKey.toLocaleUpperCase()}</S.LabelText>
          <BoxLayout {...OPTIONS}>
            <S.Input name={inputKey} value={number} onChange={onChange} />
          </BoxLayout>
        </S.Label>
      ))}
    </S.Wrapper>
  );
}

export default React.memo(InputView);
