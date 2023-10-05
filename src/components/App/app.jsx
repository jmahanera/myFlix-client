import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MovieCard } from './MovieCard/movie-card';
import MovieDetailsPage from './MovieDetailsPage'; // Create this component

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* Your main page content goes here */}
        </Route>
        <Route path="/movie/:id" component={MovieDetailsPage} />
      </Switch>
    </Router>
  );
};

export default App;
