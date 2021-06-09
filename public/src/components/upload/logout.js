// Import basics
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Link } from 'react-router-dom';
// Import icons
import { RiLogoutCircleLine } from 'react-icons/ri';
// Import server actions
import { logout, changePage } from '../../actions/authActions';

const Logout = () => {
  // Dispatch the logout action if the button is clicked
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(changePage('login'));
    dispatch(logout());
  }

  const navLinkClasses =
    " relative flex group items-center justify-center self-center sm:ml-3" +
    " h-16 w-20 cursor-pointer";
  const navIconClasses =
    " absolute opacity-1 group-hover:opacity-0 text-red-600 " +
    " transition duration-300 ease-in-out ";
  const navTextClasses =
    " absolute opacity-0 group-hover:opacity-100 ml-0 sm:ml-2 " +
    " text-red-600 text-shadow text-lg no-underline hover:no-underline " +
    " transition duration-300 ease-in-out ";

  return (
    <Link to='/login' onClick={onLogout} className={navLinkClasses}>
      <p className={navTextClasses}>
        Logout
      </p>
      <p className={navIconClasses}>
        <RiLogoutCircleLine size="40px" />
      </p>
    </Link>
  );
};

// Set proptypes and export
Logout.propTypes = {
  logout: PropTypes.func.isRequired
}
export default Logout;
