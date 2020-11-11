import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import SearchRadius from './components/SearchRadius';
import SearchBar from './components/SearchBar';
import SearchContainer from './containers/SearchContainer';
import ResultsContainer from './containers/ResultsContainer';
import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
import GoogleMap from './components/GoogleMap';
import { getUserProfile } from './actions'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  })

  return (
    <>
      <Router>
        <NavBar />
        <Route path="/" exact>
          <SearchContainer />
        </Route>
        <Route path="/signup" exact>
          <UserSignup />
        </Route>
        <Route path="/login" exact>
          <UserLogin />
        </Route>
        <Route path="/map" exact>
          <GoogleMap />
        </Route>
        <Route path="/search" exact>
          <SearchContainer />
          <ResultsContainer />
        </Route>
      </Router>
    </>
  )
}

export default App;