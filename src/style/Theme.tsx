import type { ChildrenProps } from '@/types/props';
import { ThemeProvider } from 'styled-components';

// style
import GlobalStyle from './Global';
import colors from './colors';
import FONT_SIZE from './fontSize';

function Theme({ children }: ChildrenProps) {
  return (
    <ThemeProvider
      theme={{
        colors,
        fontSize: FONT_SIZE,
      }}
    >
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
