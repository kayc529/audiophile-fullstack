import { socialMediaNavbarData } from '../../data/navbar-data';

export default function SocialMediaNavbar() {
  const openNewTab = (link: string) => {
    window.open(link);
  };

  return (
    <nav>
      <ul className='flex space-x-4'>
        {socialMediaNavbarData.map((item) => {
          return (
            <img
              key={item.name}
              className={`social-media-icon-${item.name} cursor-pointer`}
              alt={item.name}
              onClick={() => openNewTab(item.link)}
            />
          );
        })}
      </ul>
    </nav>
  );
}
