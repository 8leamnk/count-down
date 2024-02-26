import { createBrowserRouter } from 'react-router-dom';
import Countdown from './Pages/Countdown';
import NotFound from './Pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Countdown />, errorElement: <NotFound /> },
]);

export default router;
