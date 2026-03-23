import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from '@/router';

function App() {
  return (
    <>
      {/* 标题栏 */}
      <div className="titlebar">Lite Claw</div>

      {/* 路由内容 */}
      <RouterProvider router={router} />
    </>
  );
}

const root = createRoot(document.body);
root.render(<App />);
