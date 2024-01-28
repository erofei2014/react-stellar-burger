import { useSelector } from '../services/hooks';
import { Navigate, useLocation } from "react-router-dom";
import { getAuthentication } from "../services/selectors/authentication";
import { PATH_LOGIN, PATH_HOME } from './app/app';
import { FC, ReactNode } from 'react';

export type TProtected = {
  onlyUnAuth?: boolean;
  component?: ReactNode;
};

const Protected: FC<TProtected> = ({ onlyUnAuth = false, component }): any => {
  const { isAuthChecked, user } = useSelector(getAuthentication);
  const location = useLocation();

  if(!isAuthChecked) {
    return null;
  }

  if(onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: PATH_HOME } };
    return <Navigate to={from} />;
  }

  if(!onlyUnAuth && !user) {
    return <Navigate to={PATH_LOGIN} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: FC<TProtected> = ({ component }) => {
  return (
    <Protected onlyUnAuth={true} component={component} />
  );
};