// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import Components
import Logout from './logout';
// Import server actions
import { loadUser }       from '../../actions/authActions';

const Upload = () => {
  const dividerCs = "h-px w-full sm:w-px sm:h-32 mb-1 sm:mb-0 \
    bg-gradient-to-r sm:bg-gradient-to-b self-center \
    from-transparent via-yellow-500 to-transparent"

  // Check for user authentication each 1000ms
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const updateTimer = useRef(null);
  const dispatch = useDispatch();
  const setUpdate = () => {
    dispatch(loadUser());
    updateTimer.current = setTimeout(() => { updateTimer.current = null }, 1000);
  }
  useEffect(() => {
    !updateTimer.current && setUpdate() }, [isAuthenticated, dispatch]);
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current) } }, []);

  return (
    <main className="pt-36 pl-2 pr-2 sm:pr-0 sm:pt-5 sm:pl-10">
      { isAuthenticated ?
        <div className="flex flex-col sm:flex-row">
          <form className="relative flex flex-col sm:items-start items-center sm:w-136">
            <h1 className="sm:mr-2 mb-2 font-mont font-bold text-transparent bg-clip-text \
              bg-gradient-to-b from-yellow-400 to-white text-lg self-center sm:self-end">
              Select images to upload: </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <label for="wildlife"
                     className="font-mont font-bold text-transparent text-center sm:text-right mr-2 bg-clip-text \
                     bg-gradient-to-b from-yellow-400 to-white">Wildlife Images:</label>
              <input type="file"
                     id="wildlife"
                     name="wildlife"
                     className="mb-4 ml-8 sm:ml-0 font-mont font-semibold text-transparent \
                      bg-clip-text bg-gradient-to-b from-yellow-400 to-white "
                     multiple />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <label for="landscape"
                     className="font-mont font-bold text-transparent text-center sm:text-right mr-2 bg-clip-text \
                     bg-gradient-to-b from-yellow-400 to-white">Landscape Images:</label>
              <input type="file"
                     id="landscape"
                     name="landscape"
                     className="mb-4 ml-8 sm:ml-0 font-mont font-semibold text-transparent \
                      bg-clip-text bg-gradient-to-b from-yellow-400 to-white "
                     multiple />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <label for="history"
                     className="font-mont font-bold text-transparent text-center sm:text-right mr-2 bg-clip-text \
                     bg-gradient-to-b from-yellow-400 to-white">Historic Images:</label>
              <input type="file"
                     id="history"
                     name="history"
                     className="mb-4 ml-8 sm:ml-0 font-mont font-semibold text-transparent \
                      bg-clip-text bg-gradient-to-b from-yellow-400 to-white "
                     multiple />
            </div>
            <button type="submit"
                    className="mb-4 sm:mb-0 p-1 w-32 font-mont font-semibold rounded text-green-400 \
                    bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 self-center sm:self-end"
                    >Upload</button>
          </form>
          <div id="divider" className={dividerCs}></div>
          <Logout />
        </div>
        :
       <Redirect to="/login" />
     }
    </main>
  )
}

export default Upload;
