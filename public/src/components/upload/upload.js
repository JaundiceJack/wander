// Import basics
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import Components
import Logout from './logout';
// Import server actions
import { loadUser }     from '../../actions/authActions';
import { uploadPhotos } from '../../actions/photoActions';

const Upload = () => {
  const dividerCs = "h-px w-full sm:w-px sm:h-32 mb-1 sm:mb-0 " +
                    " bg-gradient-to-r sm:bg-gradient-to-b self-center " +
                    " from-transparent via-yellow-500 to-transparent ";

  // Check for user authentication
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const errorMsg = useSelector( state => state.error.msg.msg);
  const updateTimer = useRef(null);
  const dispatch = useDispatch();
  // Get the user for authentication
  useEffect(() => {
    if (!updateTimer.current) {
      dispatch(loadUser());
      updateTimer.current = setTimeout(() => { updateTimer.current = null }, 1000);
    }
  }, [isAuthenticated, dispatch]);
  // Clear the timer on unmount
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current) } }, []);

  // Submit the photos to the server
  const onSubmit = e => {
    e.preventDefault();

    // Shove the photos into a form data object
    const formData = new FormData();
    const wildFiles = document.getElementById('wildlife').files;
    const landFiles = document.getElementById('landscape').files;
    const histFiles = document.getElementById('history').files;
    for (let i = 0; i < wildFiles.length; i++) {
      formData.append('wildlife', wildFiles[i]); }
    for (let i = 0; i < landFiles.length; i++) {
      formData.append('landscape', landFiles[i]); }
    for (let i = 0; i < histFiles.length; i++) {
      formData.append('history', histFiles[i]); }

    console.log(wildFiles);
    // Send the new photos to the server/state to be added
    dispatch(uploadPhotos(formData));
  }

  const errorMsgClasses =
    " px-3 py-2 mb-2 font-semibold text-white rounded-lg " +
    " bg-gradient-to-tl from-transparent via-red-700 to-gray-900 fadeError";

  return (
    <main className="pt-36 pl-2 pr-2 sm:pr-0 sm:pt-5 sm:pl-10">
      { isAuthenticated ?
        <div className="flex flex-col sm:flex-row">
          <form onSubmit={onSubmit} className="relative flex flex-col sm:items-start items-center sm:w-136">
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
                    className="mb-4 mx-3 sm:mb-0 p-1 w-32 font-mont font-semibold rounded text-green-400 \
                    bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 self-center sm:self-end"
                    >Upload</button>
          </form>
          <div id="divider" className={dividerCs}></div>
          <Logout />
          { errorMsg && <div className={errorMsgClasses}> {errorMsg} </div> }
        </div>
        :
       <Redirect to="/login" />
     }
    </main>
  )
}

export default Upload;
