// Swiper version: 6.8.4

// Import basics
import { useState } from 'react';
// Import Swiper React components
import SwiperCore, { Thumbs, Navigation, EffectCube, A11y, Lazy, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
// Initialize modules
SwiperCore.use([Thumbs, Navigation, EffectCube, A11y, Lazy, Zoom]);

const Gallery = ({ links }) => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={"rounded-lg container-bg px-2 py-4 "} style={{minHeight: 200+"px"}}>
      {/* Main Swiper */}
      <Swiper loop={true}
        navigation={true}
        zoom={true}
        lazy={{ enabled: true, loadPrevNext: true }}
        thumbs={{ swiper: thumbsSwiper }}
        effect={"cube"}
        className="mb-4 sm:mb-8"
        style={{
          "--swiper-navigation-color": "#ffd700",
          "--swiper-pagination-color": "#ffd700",
        }}
        breakpoints={{
          0: { autoHeight: true },
          640: { autoHeight: false },
        }} >
        {links.map((link, index) => (
          <SwiperSlide key={index} >
            <div className="swiper-zoom-container">
              <img className="sm:h-screen mx-auto rounded-lg shadow-xl swiper-lazy"
                src={link.original}
                data-src={link.original}
                alt="" />
              <div className="swiper-lazy-preloader"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumb Swiper */}
      <Swiper loop={true}
        watchSlidesProgress={true}
        onSwiper={setThumbsSwiper}
        freeMode={true}
        spaceBetween={5}
        slidesPerView={1}
        className=""
        breakpoints={{
          320: { slidesPerView: 3 },
          480: { slidesPerView: 4 },
          640: { slidesPerView: 6 },
          768: { slidesPerView: 8 },
        }} >
        {links.map((link, index) => (
          <SwiperSlide key={index} >
            <img className="cursor-pointer mx-auto rounded shadow-md"
              src={link.thumbnail}
              alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Gallery;
