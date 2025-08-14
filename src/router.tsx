import { createBrowserRouter } from 'react-router-dom';
import Home from './Components/Pages/Home';
import NotFound from './Components/Pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <NotFound /> },
]);

export default router;
