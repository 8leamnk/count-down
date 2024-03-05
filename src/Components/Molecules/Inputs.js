import React from 'react';
import styled from 'styled-components';
import BoxLayout from '../Layout/BoxLayout';
import Label from '../Atoms/Label';
import Input from '../Atoms/Input';

// style
const S = {};

S.Wrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
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

function Inputs({ inputs, onChange }) {
  return (
    <S.Wrapper>
      {Object.entries(inputs).map(([inputKey, number]) => (
        <Label key={inputKey} labelText={inputKey.toLocaleUpperCase()}>
          <BoxLayout {...OPTIONS}>
            <S.Input name={inputKey} value={number} onChange={onChange} />
          </BoxLayout>
        </Label>
      ))}
    </S.Wrapper>
  );
}

export default React.memo(Inputs);
