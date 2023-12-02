import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthentification } from "../services/selectors/authentification";

const Protected = ({ onlyUnAuth = false, component }) => {
  const { isAuthChecked, user } = useSelector(getAuthentification);
  const location = useLocation();

  if(!isAuthChecked) {
    return null;
  }

  if(onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if(!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => {
  return (
    <Protected onlyUnAuth={true} component={component} />
  );
};

OnlyUnAuth.propTypes = {
  component: PropTypes.element.isRequired
};

Protected.propTypes = {
  component: PropTypes.element.isRequired,
  onlyUnAuth: PropTypes.bool
};