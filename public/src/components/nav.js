// Import Icons
import { GiFlatPawPrint } from 'react-icons/gi';
import { FaLandmark, FaMountain } from 'react-icons/fa';

const Nav = () => {
  // Compose Classes
  const navCs = "absolute top-0 sm:left-0 text-center sm:text-left \
    w-full sm:w-auto px-2 sm:px-0";
  const containerCs = "relative grid grid-cols-3 sm:grid-cols-2 gap-2 \
    sm:items-start items-center";
  const logoCs = "col-span-3 sm:col-span-1 bg-image-field bg-blue-200 \
    h-20 sm:w-20 rounded-b-xl sm:rounded-br-full \
    transform duration-75 hover:scale-105 flex";
  const logoTextCs = "ml-1 font-bold font-mont text-xl bg-clip-text \
    text-transparent bg-gradient-to-br from-yellow-500 via-blue-200";
  const navButtonCs = "h-14 w-2/3 sm:w-14 rounded-xl sm:rounded-full mx-auto \
    transform duration-75 hover:scale-110 \
    flex items-center justify-center cursor-pointer";
  const navIconCs = "text-2xl text-yellow-500 ";


  return (
    <nav className={navCs}>
      <ul id="categories" className={containerCs}>
        <li id="logo" className={logoCs}>
          <p className={logoTextCs}>WFW</p>
        </li>
        <li className={"bg-image-animal mt-1 sm:mx-1 "+navButtonCs}>
          <GiFlatPawPrint className={navIconCs} />
        </li>
        <li className={"bg-image-mountain mt-1 sm:mx-1 "+navButtonCs}>
          <FaMountain className={navIconCs} />
        </li>
        <li className={"bg-image-ruin sm:absolute sm:top-16 sm:left-16 "+navButtonCs}>
          <FaLandmark className={navIconCs} />
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
