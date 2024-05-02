import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PATH } from '@/shared/constants';

export function HomePage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const onButtonClick = () => {
    navigate(PATH.foo);
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <Link to={PATH.foo}>To Foo</Link>
      <button onClick={onButtonClick}>Button to Foo</button>
    </>
  );
}
