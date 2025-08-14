import { RouterProvider } from 'react-router-dom';
import router from './router';
import Modal from './Components/Molecules/Modal';

// style
import Theme from './style/Theme';

function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
      <Modal />
    </Theme>
  );
}

export default App;
