// Import router stuff
import { Link } from 'react-router-dom';

// Set up a nav link that routes to the target with the provided text and icon
const Navlink = ({ target, text, icon, extraClasses, onClick }) => {
  const navlinkCs = " sm:absolute z-10 h-14 w-20 sm:w-14 rounded-xl sm:rounded-full \
    transform duration-300 nav-resize \
    flex items-center justify-center cursor-pointer group ";
  const navTextCs = " font-mont font-bold bg-clip-text text-transparent  \
    bg-gradient-to-br from-yellow-500 via-yellow-300 to-yellow-500 \
    absolute opacity-0 group-hover:opacity-100 transition duration-300 ";

  return (
    <Link className={navlinkCs+extraClasses} to={target} onClick={onClick}>
      <p className={navTextCs}>{text}</p>
      <p>{icon}</p>
    </Link>
  );
};

export default Navlink;
