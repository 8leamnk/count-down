import { createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <NotFound /> },
]);

export default router;
