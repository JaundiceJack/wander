// Import basics
import PropTypes from 'prop-types';
// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Components
import Home      from './home';
import Wildlife  from './wildlife';
import Landscape from './landscape';
import History   from './history';
import About     from './about';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/"          component={Home} />
      <Route exact path="/wildlife"  component={Wildlife} />
      <Route exact path="/landscape" component={Landscape} />
      <Route exact path="/history"   component={History} />
      <Route exact path="/about"     component={About} />
    </Switch>
  )
}

export default Routes;
