// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect, Link } from 'react-router-dom';
// Import server actions
import { login, changePage }       from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const Login = () => {
  const [username,   setUsername]   = useState("");
  const [password,   setPassword]   = useState("");
  const [badEntries, setBadEntries] = useState([]);
  // Get the authentication state and submission errors
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated );
  const errorMsg        = useSelector( state => state.error.msg.msg );

  // Clear the badEntries after the timer runs out
  const dispatch = useDispatch();
  const updateTimer = useRef(null);
  const setUpdate = () => { updateTimer.current = setTimeout(() => {
    dispatch(clearErrors());
    setBadEntries([]);
    updateTimer.current = null; }, 5000);
  }
  // Update errors from the server
  useEffect(() => { !updateTimer.current && setUpdate() }, [errorMsg]);
  // Clear the timer on unmount
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // On form submission, attempt to log in
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries
    let errs = [];
    if (username === "" || username === null)
      errs.push("Please enter a valid username.");
    if (password === "" || password === null)
      errs.push("Please enter a password.");
    if (password.length > 0 && password.length < 8)
      errs.push("Passwords must be at least 8 characters in length.");
    setBadEntries(errs);
    // Attempt logging in
    if (errs.length === 0) {
      const currentUser = {
        username: username,
        password: password
      };
      dispatch(login(currentUser));
    }
    // If there were entry errors, display them for 5 seconds
    else { !updateTimer.current && setUpdate(); }
  }
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }
  const errorMsgClasses =
    " px-3 py-2 mb-2 font-semibold text-white rounded-lg " +
    " bg-gradient-to-tl from-transparent via-red-700 to-gray-900 fadeError";

  return (
    <main className="pt-36 pl-2 pr-2 sm:pr-0 sm:pt-10 sm:pl-44 flex">
      <form className="relative flex flex-col sm:items-start items-center"
            onSubmit={onSubmit}>
        <h1 className="sm:mr-2 mb-2 font-mont font-bold text-transparent bg-clip-text \
          bg-gradient-to-b from-yellow-400 to-white text-xl">
          Login: </h1>
        <input type="text"
               name="username"
               placeholder="Username"
               onChange={e => setUsername(e.target.value)}
               className="p-1 mb-4 ml-8 sm:ml-0 font-mont font-semibold rounded" />
        <input type="password"
               name="password"
               placeholder="Password"
               onChange={e => setPassword(e.target.value)}
               className="p-1 mb-4 ml-8 sm:ml-0 font-mont font-semibold rounded" />
        <button type="submit"
                className="mb-3 p-1 w-32 font-mont font-semibold rounded text-green-400 \
                bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100"
                >Login</button>
        { badEntries.map(err => <div className={errorMsgClasses}> {err} </div> )  }
        { errorMsg && <div className={errorMsgClasses}> {errorMsg} </div> }
      </form>
      {isAuthenticated && <Redirect to="/upload" />}
    </main>
  )
}

export default Login;
