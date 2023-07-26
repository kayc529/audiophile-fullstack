import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <img
      className='w-max h-max cursor-pointer'
      src='/assets/shared/desktop/logo.svg'
      alt='logo'
      onClick={goToHomePage}
    />
  );
}
