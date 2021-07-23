// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Components
import Home      from './home';
import Wildlife  from './galleries/wildlife';
import Landscape from './galleries/landscape';
import History   from './galleries/history';
import About     from './about';
import Upload    from './upload/upload';
import Login     from './upload/login';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/home"      component={Home} />
      <Route exact path="/wildlife"  component={Wildlife} />
      <Route exact path="/landscape" component={Landscape} />
      <Route exact path="/history"   component={History} />
      <Route exact path="/about"     component={About} />
      <Route exact path="/"          component={Home} />
      <Route exact path="/upload"    component={Upload} />
      <Route exact path="/login"     component={Login} />
    </Switch>
  )
}

export default Routes;
