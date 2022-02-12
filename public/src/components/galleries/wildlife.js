// Import basics
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { getWildlife } from '../../actions/photoActions.js';
// Import Components
import Gallery from './gallery.js';
import Spinner from '../misc/spinner.js';
import Message from '../misc/message.js';

const Wildlife = () => {
  // Get the image links and error messages from redux
  const { wildlife, loading, error } = useSelector( state => state.photos );

  // Request the images from the server on page load
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      if (wildlife.length === 0 ) dispatch(getWildlife());
      timer.current = setTimeout(() => {
        timer.current = null;
      }, 5000);
    }
  }, [wildlife, dispatch]);

  return (
    <main className="pt-32 sm:pt-20 pb-10 pl-0 sm:pl-24 sm:pr-10">
      {
        loading ? <Spinner /> :
        error ? <Message error={error} /> :
        <Gallery links={wildlife} />
      }
    </main>
  )
}

export default Wildlife;
