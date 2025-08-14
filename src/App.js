import { RouterProvider } from 'react-router-dom';
import router from './router';
import Popup from './Components/Molecules/Popup';

// style
import Theme from './style/Theme';

function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
      <Popup />
    </Theme>
  );
}

export default App;
