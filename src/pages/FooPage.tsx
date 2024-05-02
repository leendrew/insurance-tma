import { useNavigate, Link } from 'react-router-dom';
import { PATH } from '@/shared/constants';

export function FooPage() {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate(PATH.home);
  };

  return (
    <>
      <h1>Foo Page</h1>
      <Link to={PATH.home}>Back to Home</Link>
      <button onClick={onButtonClick}>Button to Home</button>
    </>
  );
}
