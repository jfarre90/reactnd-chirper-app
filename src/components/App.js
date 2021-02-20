import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';

export const App = (props) => {
  const authUser = useSelector(state => state.authUser);
  // TODO - ensure the loading functionality is still working
  const loading = useSelector(state => state.authUser === null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [authUser])

  return (
    <div>
      <LoadingBar />
      {loading
        ? null
        : <Dashboard />}
    </div>
  );
}

export default App;