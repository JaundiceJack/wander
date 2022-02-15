// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Components
import Home      from './home.js';
import Wildlife  from './galleries/wildlife.js';
import Landscape from './galleries/landscape.js';
import History   from './galleries/history.js';
import About     from './about.js';
import Upload    from './upload/upload.js';
import Login     from './upload/login.js';
//import Create    from './upload/create.js';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/"          component={Home} />
      <Route exact path="/home"      component={Home} />
      <Route exact path="/wildlife"  component={Wildlife} />
      <Route exact path="/landscape" component={Landscape} />
      <Route exact path="/history"   component={History} />
      <Route exact path="/about"     component={About} />
      <Route exact path="/upload"    component={Upload} />
      <Route exact path="/login"     component={Login} />
      //<Route exact path="/create"    component={Create} />
    </Switch>
  )
}

export default Routes;
