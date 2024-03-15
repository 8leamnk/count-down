import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Theme from '../../../style/Theme';
import Home from '../Home';
import NotFound from '../NotFound';

describe('404 Not Found 페이지 테스트', () => {
  test('없는 페이지에 진입하면 404 페이지가 나온다.', () => {
    // given
    const PAGE_TITLE = '404 Not Found';
    const BUTTON_TEXT = 'Go back';

    // when
    const { getByText } = render(
      <RecoilRoot>
        <Theme>
          <MemoryRouter initialEntries={['/my']}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </MemoryRouter>
        </Theme>
      </RecoilRoot>,
    );
    const title = getByText(PAGE_TITLE);
    const button = getByText(BUTTON_TEXT);

    // then
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
