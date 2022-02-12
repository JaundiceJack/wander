// Import basics
import { useSelector, useDispatch } from 'react-redux';
// Import actions
import { changePage } from '../actions/pageActions.js';
// Import Icons
import { GiFlatPawPrint, GiPeaks } from 'react-icons/gi';
import { FaLandmark } from 'react-icons/fa';
// Import router stuff
import { Link } from 'react-router-dom';
// Import Components
import Navlink from './navlink';

const Nav = () => {
  // Get the nav button to highlight from the current page
  const { page } = useSelector( state => state.page );

  // Compose Classes
  const navIconCs = " text-yellow-400 group-hover:opacity-0 transition duration-300 ";
  const logoLinkCs = " relative bg-image-field col-span-3 sm:col-span-1 h-12 sm:h-24 " +
  " w-full sm:w-24 clip-it sm:rounded-b-none rounded-b-lg " +
  " transform duration-300 hover:scale-110 flex justify-center sm:justify-start";
  const logoTextCs = " mx-auto mt-0 sm:ml-2 sm:mt-5 self-center sm:self-start " +
  " block font-bold font-mont text-xl bg-clip-text text-transparent " +
  " bg-gradient-to-tl from-blue-300 via-yellow-200 to-blue-300 ";

  // Set up a dispatch to change the highlighted page
  const dispatch = useDispatch();

  return (
    <nav className="absolute top-0 sm:left-0 w-full sm:w-auto text-center sm:text-left">
      <div className="relative grid grid-cols-3 gap-3 justify-items-center px-2 sm:px-0">

        <Link onClick={() => dispatch(changePage('home'))} to="/home" className={logoLinkCs}>
          <div className="transform sm:-rotate-45 flex ml-3">
            <p className={logoTextCs}>WFW</p>
          </div>
        </Link>

        <Navlink target="/wildlife"
                 text="Wildlife"
                 icon=<GiFlatPawPrint className={navIconCs+" text-3xl"} />
                 onClick={() => dispatch(changePage('wildlife'))}
                 positionClasses={ page === 'wildlife' ?
                 "border-3 border-green-400 sm:top-0.5 sm:left-24" :
                 "border border-gray-300 sm:top-0.5 sm:left-24"}
                 imageClass="bg-image-animal" />
        <Navlink target="/landscape"
                 text="Landscape"
                 icon=<GiPeaks className={navIconCs+" text-3xl"} />
                 onClick={() => dispatch(changePage('landscape'))}
                 positionClasses={ page === 'landscape' ?
                 "border-3 border-green-400 sm:mt-0.5 sm:ml-0.5 sm:top-12 sm:left-12" :
                 "border border-gray-300 sm:mt-0.5 sm:ml-0.5 sm:top-12 sm:left-12"}
                 imageClass="bg-image-mountain" />
        <Navlink target="/history"
                 text="History"
                 icon=<FaLandmark className={navIconCs+" text-2xl"} />
                 onClick={() => dispatch(changePage('history'))}
                 positionClasses={ page === 'history' ?
                 "border-3 border-green-400 sm:mt-1 sm:top-24 sm:left-0.5" :
                 "border border-gray-300 sm:mt-1 sm:top-24 sm:left-0.5"}
                 imageClass="bg-image-ruin" />
      </div>
  </nav>
  )
}

export default Nav;
