import styled from 'styled-components';
import type { BoxLayoutInfo, HeightInfo, RadiusInfo } from '../../types/style';
import type { ChildrenProps } from '../../types/props';

// style
const S = {
  Outer: styled.div<{ $radius: RadiusInfo; $padding: number }>`
    background-color: ${({ theme }) => theme.colors.outer};
    border-radius: ${({ $radius }) => $radius}px;
    padding: ${({ $padding }) => $padding}px;
    box-sizing: border-box;
  `,

  Inner: styled.div<{
    $height: HeightInfo;
    $radius: RadiusInfo;
    $padding: number;
  }>`
    height: ${({ $height }) => $height}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.inner};
    border-radius: ${({ $radius }) => $radius}px;
    padding: 0 ${({ $padding }) => $padding}px;
    box-sizing: border-box;
  `,
};

interface BoxLayoutProps extends ChildrenProps {
  options: BoxLayoutInfo;
}

function BoxLayout({ children, options }: BoxLayoutProps) {
  const { padding, radius, height } = options;

  return (
    <S.Outer id="box-outer" $padding={padding.outer} $radius={radius}>
      <S.Inner
        id="box-inner"
        $height={height}
        $padding={padding.inner}
        $radius={radius - 2}
      >
        {children}
      </S.Inner>
    </S.Outer>
  );
}

export default BoxLayout;
