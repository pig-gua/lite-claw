import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello React</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </>
  );
}

const root = createRoot(document.body);
root.render(<App />);
