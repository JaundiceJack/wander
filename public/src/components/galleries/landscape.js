// Import basics
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import an image gallery api
import ImageGallery from 'react-image-gallery';
// Import server actions
import { getLandscape } from '../../actions/photoActions';

const Landscape = () => {
  // Get the image links and error messages from redux
  const landscape = useSelector( state => state.photos.landscape );
  const errorMsg = useSelector( state => state.error.msg.msg );

  // Get the images from the server on page load
  const updateTimer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => { // Update images when the page loads
    if (!updateTimer.current) {
      dispatch(getLandscape());
      updateTimer.current = setTimeout(() => { // Prevent update for 10 seconds
      updateTimer.current = null }, 10000);
    }
  }, [landscape, dispatch]);
  useEffect(() => { return () => { // Clear the timer on page unload
    updateTimer.current && clearTimeout(updateTimer.current) } }, []);

  // Compose Classes
  const containerCs = " border-l border-blue-200 shadow-lg " +
                      " bg-gradient-to-br from-transparent via-blue-200 " +
                      " to-transparent p-5 flex flex-col sm:flex-row " +
                      " rounded-xl rounded-tl-lg";
  const errorMsgClasses = " px-3 py-2 mb-2 font-semibold text-white rounded-lg " +
                          " bg-gradient-to-tl from-transparent via-red-700 " +
                          " to-gray-900 fadeError ";

  return (
    <main class="pt-44 pb-10 pl-0 sm:pl-24 sm:pt-24 sm:pr-10">
      <div className={containerCs}>
        <ImageGallery thumbnailPosition={window.innerWidth < 480 ? 'bottom' : 'left' }
                        items={landscape}
                        additionalClass="mx-auto w-full"
                        lazyLoad='true' />
      </div>
      { errorMsg && <div className={errorMsgClasses}> {errorMsg} </div> }
    </main>
  )
}

export default Landscape;
