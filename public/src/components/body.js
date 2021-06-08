// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
//Import Components
import Nav    from './nav';
import Routes from './routes';

const Body = () => {
  const page = useSelector( state => state.page.currentPage );

  return (
    <body className="relative bg-black min-h-screen bg-image-chip">
      <Nav />
      <Routes />
    </body>
  )
}

export default Body;
