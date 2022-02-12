// Import basics
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { register } from '../../actions/userActions.js';
import { clearError } from '../../actions/errorActions.js';
// Import components
import Message   from '../misc/message.js';
import Spinner   from '../misc/spinner.js';
import TextEntry from '../input/textEntry.js';
import Button    from '../input/button.js';

const Create = ({ location, history }) => {
  // Initialize the component's state for each form field
  const [entries, setEntries] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  })
  const onEntry = e => { setEntries({...entries, [e.target.name]: e.target.value }); };
  const [badEntries, setBadEntries] = useState([]);

  // Get the authentication state and submission errors
  const { user, loading, error } = useSelector( state => state.user );

  // Grab any redirect from the history
  const redirect = location.search ? location.search.split('=')[1] : "/upload";

  // Clear the badEntries after the timer runs out
  const dispatch = useDispatch();
  const updateTimer = useRef(null);
  const clearErrors = () => {
    updateTimer.current = setTimeout(() => {
    dispatch(clearError('user'));
    setBadEntries([]);
    updateTimer.current = null; }, 5000);
  }
  // Update errors from the server
  useEffect(() => {
    if (user) { history.push(redirect) }
    else if (!updateTimer.current) { clearErrors(); }
  }, [error, dispatch, user, history, redirect]);
  // Clear the timer on unmount
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // On form submission, attempt to create a new user
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries
    let errs = [];
    if (entries.name === "" || entries.name === null)
      errs.push("Please enter a valid username.");
    if (entries.password === "" || entries.password === null)
      errs.push("Please enter a password.");
    if (entries.password.length > 0 && entries.password.length < 8)
      errs.push("Passwords must be at least 8 characters in length.");
    if (entries.password !== entries.confirm)
      errs.push("Password and password confirmation do not match.");
    setBadEntries(errs);

    // Register the new user
    if (errs.length === 0) { dispatch(register(entries)); }
    // If there were entry errors, display them for 5 seconds
    else { !updateTimer.current && clearErrors(); }
  }

  return (
    <main className="pt-36 pl-2 pr-2 sm:pr-0 sm:pt-32 sm:pl-32 flex">
      <form className="relative flex flex-col sm:items-start items-center container-bg p-4 rounded-lg"
            onSubmit={onSubmit}>
        {loading ? <Spinner /> :
          <div className="flex flex-col">
            <h1 className={"sm:mr-2 mb-2 font-mont font-bold text-transparent bg-clip-text " +
              "bg-gradient-to-b from-yellow-400 to-white text-xl"}>
              Create a new account: </h1>
            <TextEntry name="name" label="Username:" placeholder="Username" labelColor="text-yellow-400"
                   onChange={onEntry} />
            <TextEntry name="email" type="email" label="Email:" placeholder="Email" labelColor="text-yellow-400"
                   onChange={onEntry} />
            <TextEntry type="password" type="password" name="password" label="Password:" placeholder="Password" labelColor="text-yellow-400"
                   onChange={onEntry} />
            <TextEntry type="password" type="password" name="confirm" label="Confirm:" placeholder="Confirm Password" labelColor="text-yellow-400"
                   onChange={onEntry} extraClasses="mb-4"/>
            <Button type="submit" label="Create" extraClasses="mx-auto" />
            { badEntries.map(err => <Message error={err} /> )  }
            { error && <Message error={error} /> }
          </div>
        }
      </form>
    </main>
  )
}

export default Create;
