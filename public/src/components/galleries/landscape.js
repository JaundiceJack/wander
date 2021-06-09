import ImageGallery from 'react-image-gallery';
import image1 from '../../images/landscape/valley1.jpg';
import image1_thumb from '../../images/landscape/valley1t.jpg';
import image2 from '../../images/landscape/trees1.jpg';
import image2_thumb from '../../images/landscape/trees1t.jpg';
import image3 from '../../images/landscape/river1.jpg';
import image3_thumb from '../../images/landscape/river1t.jpg';
import image4 from '../../images/landscape/mountain1.jpg';
import image4_thumb from '../../images/landscape/mountain1t.jpg';

const Landscape = () => {
  const images = [
    { original: image1, thumbnail: image1_thumb },
    { original: image2, thumbnail: image2_thumb },
    { original: image3, thumbnail: image3_thumb },
    { original: image4, thumbnail: image4_thumb },
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

export default Landscape;
