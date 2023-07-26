import { navbarData } from '../../data/navbar-data';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();

  const goToPage = (link: string): void => {
    navigate(link);
  };
  return (
    <nav>
      <ul className='flex flex-col items-center space-y-4 md:flex-row md:space-x-8 md:space-y-0'>
        {navbarData.map((item) => {
          return (
            <li key={item.name}>
              <p
                className='uppercase text-sm text-white tracking-sm cursor-pointer hover:text-darkOrange'
                onClick={() => goToPage(item.link)}
              >
                {item.name}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
