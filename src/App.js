import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import router from './router';
import Popup from './Components/Molecules/Popup';

// style
import Theme from './style/Theme';

function App() {
  return (
    <RecoilRoot>
      <Theme>
        <RouterProvider router={router} />
        <Popup />
      </Theme>
    </RecoilRoot>
  );
}

export default App;
