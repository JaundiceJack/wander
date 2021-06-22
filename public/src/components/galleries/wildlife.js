// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import an image gallery api
import ImageGallery from 'react-image-gallery';
// Import server actions
import { getWildlife } from '../../actions/photoActions';



import image1 from '../../images/wildlife/buffalo1.jpg';
import image1_thumb from '../../images/wildlife/buffalo1_thumbnail.jpg';
import image2 from '../../images/wildlife/redWingBlackBird1.jpg';
import image2_thumb from '../../images/wildlife/redWingBlackBird1_thumbnail.jpg';
import image3 from '../../images/wildlife/heron1.jpg';
import image3_thumb from '../../images/wildlife/heron1_thumbnail.jpg';
import image4 from '../../images/wildlife/bee1.jpg';
import image4_thumb from '../../images/wildlife/bee1_thumbnail.jpg';
import image5 from '../../images/wildlife/rubberBoa1.jpg';
import image5_thumb from '../../images/wildlife/rubberBoa1_thumbnail.jpg';
import image6 from '../../images/wildlife/heron2.jpg';
import image6_thumb from '../../images/wildlife/heron2_thumbnail.jpg';
import image7 from '../../images/wildlife/woodpecker1.jpg';
import image7_thumb from '../../images/wildlife/woodpecker1_thumbnail.jpg';
import image8 from '../../images/wildlife/dragonfly1.jpg';
import image8_thumb from '../../images/wildlife/dragonfly1_thumbnail.jpg';
import image9 from '../../images/wildlife/bluejay1.jpg';
import image9_thumb from '../../images/wildlife/bluejay1_thumbnail.jpg';

// So, i think i actually need to store the images on the server,
// and request them in the format below,
// for one, storing them all on the client would be bad,
// and there seems to be no automatic way.
// can mongo store images?


const Wildlife = () => {
  const wildlife = useSelector( state => state.photos.wildlife );
  const updateTimer = useRef(null);
  const dispatch = useDispatch();
  const setUpdate = () => {
    // dispatch(getWildlife());
    updateTimer.current = setTimeout(() => { updateTimer.current = null }, 1000);
  }
  useEffect(() => {
    !updateTimer.current && setUpdate() }, [wildlife, dispatch]);
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current) } }, []);

  const images = [
    { original: image1, thumbnail: image1_thumb },
    { original: image2, thumbnail: image2_thumb },
    { original: image3, thumbnail: image3_thumb },
    { original: image4, thumbnail: image4_thumb },
    { original: image5, thumbnail: image5_thumb },
    { original: image6, thumbnail: image6_thumb },
    { original: image7, thumbnail: image7_thumb },
    { original: image8, thumbnail: image8_thumb },
    { original: image9, thumbnail: image9_thumb },
  ];

  // Compose Classes
  const containerCs = "border-l border-blue-200 shadow-lg \
    bg-gradient-to-br from-transparent via-blue-200 to-transparent \
    p-5 flex flex-col sm:flex-row rounded-xl rounded-tl-lg"
  const headerCs = "font-bold text-shadow text-yellow-500 leading-10"
  const dividerCs = "h-px w-full sm:w-px sm:h-32 mb-1 sm:mb-0 \
    bg-gradient-to-r sm:bg-gradient-to-b \
    from-transparent via-yellow-600 to-transparent"
  const linkCs = "text-shadow text-xl text-yellow-400 font-semibold \
    transform duration-75 hover:scale-105";

  return (
    <main class="pt-44 pb-10 pl-0 sm:pl-24 sm:pt-24 sm:pr-10">
      <div className={containerCs}>
        <ImageGallery thumbnailPosition={window.innerWidth < 480 ? 'bottom' : 'left' }
                        items={images}
                        additionalClass="mx-auto w-full" />
      </div>
    </main>
  )
}

export default Wildlife;
