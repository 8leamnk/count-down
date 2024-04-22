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

const OPTIONS = Object.freeze({
  padding: { outer: 4, inner: 12 },
  radius: 8,
  height: 52,
});

function Inputs({ inputs, ...inputOptions }) {
  return (
    <S.Wrapper>
      {Object.entries(inputs).map(([inputKey, number]) => (
        <Label key={inputKey} labelText={inputKey.toLocaleUpperCase()}>
          <BoxLayout {...OPTIONS}>
            <Input name={inputKey} value={number} {...inputOptions} />
          </BoxLayout>
        </Label>
      ))}
    </S.Wrapper>
  );
}

export default Inputs;
