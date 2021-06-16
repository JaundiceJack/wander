// Import router stuff
import { Link } from 'react-router-dom';

// Set up a nav link that routes to the target with the provided text and icon
const Navlink = ({ target, text, icon, positionClasses, imageClass, onClick }) => {
  const navlinkCs = " sm:absolute z-10 h-12 w-20 sm:w-12  \
    transform duration-300 nav-resize \
    flex items-center justify-center cursor-pointer group rounded-xl sm:rounded-full ";
  const navTextCs = " font-mont font-bold bg-clip-text text-transparent  \
    bg-gradient-to-b from-yellow-300 via-white to-blue-100 \
    absolute opacity-0 group-hover:opacity-100 transition duration-300 ";

  return (
    <Link className={navlinkCs+positionClasses} to={target} onClick={onClick}>
      <p className={navTextCs+" z-10"}>{text}</p>
      <p className="z-10">{icon}</p>
      <div className={imageClass+" absolute z-0 w-full h-full nav-image rounded-xl sm:rounded-full"} />
    </Link>
  );
};

export default Navlink;
