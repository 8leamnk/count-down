import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Theme from '../../../style/Theme';
import Home from '../Home';
import NotFound from '../NotFound';

describe('404 Not Found 페이지 테스트', () => {
  const queryClient = new QueryClient();

  test('없는 페이지에 진입하면 404 페이지가 나온다.', () => {
    // given
    const PAGE_TITLE = '404 Not Found';
    const BUTTON_TEXT = 'Go back';

    // when
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Theme>
          <MemoryRouter initialEntries={['/my']}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </MemoryRouter>
        </Theme>
      </QueryClientProvider>,
    );
    const title = getByText(PAGE_TITLE);
    const button = getByText(BUTTON_TEXT);

    // then
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
