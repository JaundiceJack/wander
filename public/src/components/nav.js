// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import actions
import { changePage } from '../actions/pageActions';
// Import Icons
import { GiFlatPawPrint } from 'react-icons/gi';
import { FaLandmark, FaMountain } from 'react-icons/fa';
// Import router stuff
import { Link } from 'react-router-dom';

const Nav = () => {
  // Get the nav button to highlight from the current page
  const page = useSelector( state => state.page.currentPage );

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

  // Change the highlighted page icon
  const dispatch = useDispatch();
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

  return (
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
  )
}

export default Nav;
