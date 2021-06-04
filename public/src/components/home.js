// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import actions
import { changePage } from '../actions/pageActions';
// Import router stuff
import { Link } from 'react-router-dom';

const Home = () => {
  // Compose Classes
  const containerCs = "mx-5 shadow-xl border-l border-blue-200 \
    bg-gradient-to-br from-blue-200 to-transparent \
    p-5 flex flex-col sm:flex-row rounded-xl rounded-tl-lg"
  const headerCs = "font-bold text-shadow text-yellow-500 leading-10"
  const dividerCs = "h-px w-full sm:w-px sm:h-32 mb-1 sm:mb-0 \
    bg-gradient-to-r sm:bg-gradient-to-b \
    from-transparent via-yellow-600 to-transparent"
  const linkCs = "text-shadow text-xl text-yellow-400 font-semibold \
    transform duration-75 hover:scale-105";

  // Change the highlighted page icon
  const dispatch = useDispatch();
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

  return (
    <main class="flex justify-center pt-44">
      <div className={containerCs}>
        <div id="intro" class="pr-4 mb-2 sm:mb-0 font-mont">
          <h1 className={headerCs+" text-3xl"}>Wayfarer's Wander</h1>
          <h2 className={headerCs+" text-xl"}>Nature Photography</h2>
        </div>
        <div id="divider" className={dividerCs}></div>
        <div id="links" class="px-6 py-2 flex flex-col font-mont">
          <Link to="/wildlife"
            className={linkCs}
            onClick={() => changeActive('wildlife')}>WildLife</Link>
          <Link to="/landscape"
            className={linkCs}
            onClick={() => changeActive('landscape')}>Landscape</Link>
          <Link to="/history"
            className={linkCs+" mb-2"}
            onClick={() => changeActive('history')}>History</Link>
          <Link to="/about"
            className={linkCs}
            onClick={() => changeActive('about')}>About Me</Link>
        </div>
      </div>
    </main>
  )
}

export default Home;
