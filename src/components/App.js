import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';
import { Switch, Route } from 'react-router-dom';

export const App = (props) => {
  const authUser = useSelector(state => state.authUser);
  // TODO - ensure the loading functionality is still working
  const loading = useSelector(state => state.authUser === null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [authUser])

  return (
    <Switch>
      <Fragment>
        <LoadingBar />
        <div className="container">
          <Nav />
          {loading
            ? null
            : <div>
              <Route exact path="/">
                < Dashboard />
              </Route>
              <Route path="/tweet/:id">
                <TweetPage />
              </Route>
              <Route path="/new">
                < NewTweet />
              </Route>
            </div>}
        </div>
      </Fragment>
    </Switch>
  );
}

export default App;