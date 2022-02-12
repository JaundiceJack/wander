// Import basics
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { getHistory } from '../../actions/photoActions.js';
// Import Components
import Gallery from './gallery.js';
import Spinner from '../misc/spinner.js';
import Message from '../misc/message.js';

const History = () => {
  // Get the image links and error messages from redux
  const { history, loading, error } = useSelector( state => state.photos );

  // Request the images from the server on page load
  const timer = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!timer.current) {
      if (history.length === 0 ) dispatch(getHistory());
      timer.current = setTimeout(() => {
        timer.current = null;
      }, 5000);
    }
  }, [history, dispatch]);

  return (
    <main className="pt-32 sm:pt-20 pb-10 pl-0 sm:pl-24 sm:pr-10">
      {
        loading ? <Spinner /> :
        error ? <Message error={error} /> :
        <Gallery links={history} />
      }
    </main>
  )
}

export default History;
