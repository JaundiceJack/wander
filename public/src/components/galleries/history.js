import ImageGallery from 'react-image-gallery';
import image1 from '../../images/history/buddha1.jpg';
import image1_thumb from '../../images/history/buddha1t.jpg';
import image2 from '../../images/history/buddha2.jpg';
import image2_thumb from '../../images/history/buddha2t.jpg';

const History = () => {
  const images = [
    { original: image1, thumbnail: image1_thumb },
    { original: image2, thumbnail: image2_thumb },
  ];

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

export default History;
