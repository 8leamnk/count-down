import React from 'react';
import styled from 'styled-components';

// style
const S = {};

S.Outer = styled.div`
  background-color: ${({ theme }) => theme.colors.outer};
  border-radius: ${({ $radius }) => `${$radius}px`};
  padding: ${({ $padding }) => `${$padding}px}`};
`;

S.Inner = styled.div`
  height: ${({ $height }) => `${$height}px`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.inner};
  border-radius: ${({ $radius }) => `${$radius}px`};
  padding: ${({ $padding }) => `0 ${$padding}px}`};
`;

function BoxLayout({ children, ...options }) {
  const { padding, radius, height } = options;

  return (
    <S.Outer $padding={padding.outer} $radius={radius}>
      <S.Inner $height={height} $padding={padding.inner} $radius={radius - 2}>
        {children}
      </S.Inner>
    </S.Outer>
  );
}

export default React.memo(BoxLayout);
