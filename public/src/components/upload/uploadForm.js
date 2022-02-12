// Import basics
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadPhotos } from '../../actions/photoActions.js';
import Button from '../input/button.js';
import FileEntry from '../input/fileEntry.js';
import Message   from '../misc/message.js';

const UploadForm = () => {
  // Get state variables
  const { loading, error } = useSelector(state => state.photos);

  // Submit the photos to the server
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();

    // Shove the photos into a form data object
    const formData = new FormData();
    const wildFiles = document.getElementById('wildlife').files;
    const landFiles = document.getElementById('landscape').files;
    const histFiles = document.getElementById('history').files;
    for (let i = 0; i < wildFiles.length; i++) {
      formData.append('wildlife', wildFiles[i]); }
    for (let i = 0; i < landFiles.length; i++) {
      formData.append('landscape', landFiles[i]); }
    for (let i = 0; i < histFiles.length; i++) {
      formData.append('history', histFiles[i]); }

    // Send the new photos to the server/state to be added
    dispatch(uploadPhotos(formData));

    if (!error) {
      document.getElementById('wildlife').value = null;
      document.getElementById('landscape').value = null;
      document.getElementById('history').value = null;
    }
  }

  return (
    <form className={"relative flex flex-col sm:items-start items-center sm:self-start mx-auto " +
      "container-bg-dark p-4 rounded-lg"}
      onSubmit={onSubmit}>
      <div className="flex flex-col items-center justify-center">
        <h1 className={"mb-4 font-mont font-bold text-transparent bg-clip-text " +
          "bg-gradient-to-b from-yellow-400 to-white text-lg self-center"}>
          Select images to upload:
        </h1>
        <div className="pt-4 mb-4 container-bg rounded-lg mx-auto">
          <FileEntry name="wildlife"
            id="wildlife"
            label="Wildlife:"
            labelColor="text-yellow-400" />
          <FileEntry name="landscape"
            id="landscape"
            label="Landscape:"
            labelColor="text-yellow-400" />
          <FileEntry name="history"
            id="history"
            label="History:"
            labelColor="text-yellow-400"
            extraClasses="mb-4"/>
        </div>

        <Button type="submit"
          label="Upload"
          textColor="green"
          brightness="500"
          loading={loading}
          extraClasses="mx-auto w-32"/>

        <div className="flex flex-col items-center justify-center">

          { error && <Message error={error} /> }
        </div>
      </div>
    </form>
  )
}

export default UploadForm;
