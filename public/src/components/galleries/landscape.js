// Import basics
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { getLandscape } from '../../actions/photoActions.js';
// Import Components
import Gallery from './gallery.js';
import Spinner from '../misc/spinner.js';
import Message from '../misc/message.js';

const Landscape = () => {
  // Get the image links and error messages from redux
  const { landscape, loading, error } = useSelector( state => state.photos );

  // Request the images from the server on page load
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      if (landscape.length === 0 ) dispatch(getLandscape());
      timer.current = setTimeout(() => {
        timer.current = null;
      }, 5000);
    }
  }, [landscape, dispatch]);

  return (
    <main className="pt-32 sm:pt-20 pb-10 pl-0 sm:pl-24 sm:pr-10">
      {
        loading ? <Spinner /> :
        error ? <Message error={error} /> :
        <Gallery links={landscape} />
      }
    </main>
  )
}

export default Landscape;
