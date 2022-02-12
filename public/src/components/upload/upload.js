// Import basics
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { loadUser }     from '../../actions/userActions.js';
import { getWildlife, getLandscape, getHistory } from '../../actions/photoActions.js';
import { clearError }   from '../../actions/errorActions.js';
// Import components
import Logout from './logout.js';
import ThumbGallery from './thumbGallery.js';
import UploadForm from './uploadForm.js';

const Upload = ({ location, history }) => {
  // Check for user authentication
  const { authenticated, user } = useSelector(state => state.user);
  const { wildlife, landscape, history: historyPhotos } = useSelector(state => state.photos);

  // Clear the badEntries after the timer runs out
  const dispatch = useDispatch();
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      if (!user) { dispatch(loadUser()); }
      if (wildlife.length === 0 ) dispatch(getWildlife());
      if (landscape.length === 0 ) dispatch(getLandscape());
      if (historyPhotos.length === 0 ) dispatch(getHistory());
      timer.current = setTimeout(() => {
        dispatch(clearError('photos'));
        timer.current = null;
      }, 50000);
    }
  }, [dispatch, history, user, authenticated, wildlife, landscape, historyPhotos]);
  // Clear the timer on unmount
  useEffect(() => { return () => { timer.current && clearTimeout(timer.current); }; }, []);

  return (
    <main className="pt-36 pl-2 pr-2 sm:pr-0 sm:pt-32 sm:pl-32 sm:mr-10 pb-10 grid sm:grid-cols-2 grid-cols-1 gap-4">

      <UploadForm />

      <ThumbGallery wildlife={wildlife} landscape={landscape} history={historyPhotos} extraClasses="h-48" />

      <div className="container-bg-dark rounded-full flex items-center justify-center sm:col-span-2 w-1/2 mx-auto">
        <Logout />
      </div>
    </main>
  )
}

export default Upload;
