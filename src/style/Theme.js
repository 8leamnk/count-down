import { ThemeProvider } from 'styled-components';

// style
import GlobalStyle from './Global';
import colors from './colors';
import FONT_SIZE from './fontSize';

function Theme({ children }) {
  const theme = {
    colors,
    fontSize: FONT_SIZE,
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
