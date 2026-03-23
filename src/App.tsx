import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from '@/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const root = createRoot(document.body);
root.render(<App />);
