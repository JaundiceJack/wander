// Import basics
import PropTypes from 'prop-types';
//Import Components
import Nav    from './nav';
import Routes from './routes';

const Body = () => {
  return (
    <body className="relative bg-black min-h-screen bg-image-chip">
      <Nav />
      <Routes />
    </body>
  )
}

export default Body;
