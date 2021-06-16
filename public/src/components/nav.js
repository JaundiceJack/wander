// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import actions
import { changePage } from '../actions/authActions';
// Import Icons
import { GiFlatPawPrint, GiPeaks } from 'react-icons/gi';
import { FaLandmark, FaMountain } from 'react-icons/fa';
// Import router stuff
import { Link } from 'react-router-dom';
// Import Components
import Navlink from './navlink';

const Nav = () => {
  // Get the nav button to highlight from the current page
  const page = useSelector( state => state.auth.currentPage );

  // Compose Classes
  const navCs = "z-10 absolute top-0 sm:left-0 text-center sm:text-left \
    w-full sm:w-auto px-2 sm:px-0";
  const containerCs = "relative grid grid-cols-3 sm:grid-cols-2 gap-2 \
    sm:items-start items-center";
  const logoCs = "col-span-3 sm:col-span-1 bg-image-field bg-blue-200 \
    h-20 sm:w-20 rounded-b-xl sm:rounded-br-full \
    transform duration-75 hover:scale-105 flex";
  const logoTextCs = "ml-1 font-bold font-mont text-xl bg-clip-text \
    text-transparent bg-gradient-to-br from-yellow-500 via-blue-200";
  const navIconCs = "text-yellow-400 group-hover:opacity-0 transition duration-300 ";


  // Change the highlighted page icon
  const dispatch = useDispatch();
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

  return (
    <nav className="absolute top-0 sm:left-0 w-full sm:w-auto text-center sm:text-left">
      <div className="relative grid grid-cols-3 gap-3 justify-items-center px-2 sm:px-0">

        <Link id="logo"
              onClick={() => changeActive('home')}
              to="/home"
              className="bg-image-field col-span-3 sm:col-span-1 h-12 sm:h-24 \
                w-full sm:w-24 clip-it sm:rounded-b-none rounded-b-lg \
                transform duration-300 hover:scale-110 flex">
          <p className="mx-auto mt-0 sm:ml-2 sm:mt-5 self-center sm:self-start \
            text-flip font-bold font-mont text-xl bg-clip-text text-transparent \
            bg-gradient-to-tl from-blue-300 via-yellow-200 to-blue-300">WFW</p>
        </Link>

        <Navlink target="/wildlife"
                 text="Wildlife"
                 icon=<GiFlatPawPrint className={navIconCs+" text-3xl"} />
                 onClick={() => changeActive('wildlife')}
                 positionClasses={ page === 'wildlife' ?
                 "border-3 border-green-400 sm:top-0.5 sm:left-24" :
                 "border border-gray-300 sm:top-0.5 sm:left-24"}
                 imageClass="bg-image-animal" />
        <Navlink target="/landscape"
                 text="Landscape"
                 icon=<GiPeaks className={navIconCs+" text-3xl"} />
                 onClick={() => changeActive('landscape')}
                 positionClasses={ page === 'landscape' ?
                 "border-3 border-green-400 sm:mt-0.5 sm:ml-0.5 sm:top-12 sm:left-12" :
                 "border border-gray-300 sm:mt-0.5 sm:ml-0.5 sm:top-12 sm:left-12"}
                 imageClass="bg-image-mountain" />
        <Navlink target="/history"
                 text="History"
                 icon=<FaLandmark className={navIconCs+" text-2xl"} />
                 onClick={() => changeActive('history')}
                 positionClasses={ page === 'history' ?
                 "border-3 border-green-400 sm:mt-1 sm:top-24 sm:left-0.5" :
                 "border border-gray-300 sm:mt-1 sm:top-24 sm:left-0.5"}
                 imageClass="bg-image-ruin" />
      </div>
  </nav>
  )
}

export default Nav;

/*
<nav className={navCs}>
  <ul id="categories" className={containerCs}>
    <Link to="/home"
          className={logoCs}
          onClick={() => changeActive('home')}>
      <p className={logoTextCs}>WFW</p>
    </Link>
    <Link to="/wildlife"
          className={page === 'wildlife' ?
          "bg-image-animal mt-1 sm:mx-1 border-2 border-green-400 " + navButtonCs :
          "bg-image-animal mt-1 sm:mx-1 " + navButtonCs}
          onClick={() => changeActive('wildlife')}>
      <GiFlatPawPrint className={navIconCs} />
    </Link>
    <Link to="/landscape"
          className={page === 'landscape' ?
          "bg-image-mountain mt-1 sm:mx-1 border-2 border-green-400 " + navButtonCs :
          "bg-image-mountain mt-1 sm:mx-1 " + navButtonCs}
          onClick={() => changeActive('landscape')}>
      <FaMountain className={navIconCs} />
    </Link>
    <Link to="/history"
          className={page === 'history' ?
          "bg-image-ruin sm:absolute sm:top-16 sm:left-16 border-2 border-green-400 " + navButtonCs :
          "bg-image-ruin sm:absolute sm:top-16 sm:left-16 " + navButtonCs}
          onClick={() => changeActive('history')}>
      <FaLandmark className={navIconCs} />
    </Link>
  </ul>
</nav>
*/
