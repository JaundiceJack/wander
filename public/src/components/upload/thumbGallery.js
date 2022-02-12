// Swiper version: 6.8.4

// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../input/button.js';
import { IoTrashOutline } from 'react-icons/io5';
import { deletePhoto } from '../../actions/photoActions.js';
// Import Swiper React components
import SwiperCore, { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
// Initialize modules
SwiperCore.use([Navigation, A11y]);

const ThumbGallery = ({ wildlife, landscape, history, extraClasses="" }) => {
  const { loading } = useSelector(state => state.photos);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  return (
    <div className={"rounded-lg container-bg-dark px-2 pt-8 pb-4 flex flex-col items-center" + extraClasses}>
      <h1 className={"sm:mr-2 mb-4 font-mont font-bold text-transparent bg-clip-text " +
        "bg-gradient-to-b from-red-400 to-white text-lg self-center"}>
        Select images to delete:
      </h1>
      <h2 className={"sm:mr-2 mb-4 font-mont font-bold text-transparent bg-clip-text " +
        "bg-gradient-to-b from-yellow-400 to-white text-lg self-center"}>
        Wildlife:
      </h2>
      {/* Wildlife Swiper */}
      <div>
        <Swiper
          navigation={true}
          className="mb-4 sm:mb-8"
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          style={{
            "--swiper-navigation-color": "#ffd700",
            "--swiper-pagination-color": "#ffd700",
          }} >
          {wildlife.map((link, index) => (
            <div className="flex flex-col items-center justify-center">
              <SwiperSlide key={index}>
                <img className={
                  "cursor-pointer my-1 mx-auto rounded shadow-md " +
                    (selected.indexOf(link._id) !== -1 && "ring-4 ring-red-500")}
                  src={link.thumbnail}
                  data-src={link.thumbnail}
                  alt=""
                  onClick={() => {selected.indexOf(link._id) === -1 ? setSelected([...selected, link._id]) : setSelected(selected.filter(id => id !== link._id))}} />
              </SwiperSlide>
            </div>

          ))}
        </Swiper>
      </div>
      <h2 className={"sm:mr-2 mb-4 font-mont font-bold text-transparent bg-clip-text " +
        "bg-gradient-to-b from-yellow-400 to-white text-lg self-center"}>
        Landscape:
      </h2>
      {/* Landscape Swiper */}
      <div>
        <Swiper
          navigation={true}
          className="mb-4 sm:mb-8"
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          style={{
            "--swiper-navigation-color": "#ffd700",
            "--swiper-pagination-color": "#ffd700",
          }} >
          {landscape.map((link, index) => (
            <div className="flex flex-col items-center justify-center">
              <SwiperSlide key={index}>
                <img className={
                  "cursor-pointer my-1 mx-auto rounded shadow-md " +
                    (selected.indexOf(link._id) !== -1 && "ring-4 ring-red-500")}
                  src={link.thumbnail}
                  data-src={link.thumbnail}
                  alt=""
                  onClick={() => {selected.indexOf(link._id) === -1 ? setSelected([...selected, link._id]) : setSelected(selected.filter(id => id !== link._id))}} />
              </SwiperSlide>
            </div>

          ))}
        </Swiper>
      </div>
      <h2 className={"sm:mr-2 mb-4 font-mont font-bold text-transparent bg-clip-text " +
        "bg-gradient-to-b from-yellow-400 to-white text-lg self-center"}>
        History:
      </h2>
      {/* History Swiper */}
      <div>
        <Swiper
          navigation={true}
          className="mb-4 sm:mb-8"
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          style={{
            "--swiper-navigation-color": "#ffd700",
            "--swiper-pagination-color": "#ffd700",
          }} >
          {history.map((link, index) => (
            <div className="flex flex-col items-center justify-center">
              <SwiperSlide key={index}>
                <img className={
                  "cursor-pointer my-1 mx-auto rounded shadow-md " +
                    (selected.indexOf(link._id) !== -1 && "ring-4 ring-red-500")}
                  src={link.thumbnail}
                  data-src={link.thumbnail}
                  alt=""
                  onClick={() => {selected.indexOf(link._id) === -1 ? setSelected([...selected, link._id]) : setSelected(selected.filter(id => id !== link._id))}} />
              </SwiperSlide>
            </div>

          ))}
        </Swiper>
      </div>

      <Button textColor="red"
        brightness="600"
        label="Delete Photos"
        icon={<IoTrashOutline />}
        loading={loading}
        onClick={() => {
          selected.forEach((id, i) => {
            dispatch(deletePhoto(id))
          });
        }}
        extraClasses="mx-auto px-5"/>
    </div>
  )
}

export default ThumbGallery;
