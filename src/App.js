import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './router';
import Popup from './Components/Molecules/Popup';

// style
import Theme from './style/Theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <RouterProvider router={router} />
        <Popup />
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
