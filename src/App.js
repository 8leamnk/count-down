import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import router from './router';

// style
import Theme from './style/Theme';

function App() {
  return (
    <RecoilRoot>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </RecoilRoot>
  );
}

export default App;
