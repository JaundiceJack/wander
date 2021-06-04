// Import state stuff
import store from './store';
import {Provider} from 'react-redux';
// Import routing stuff
import { BrowserRouter } from 'react-router-dom';
// Import components
import Nav    from './components/nav';
import Routes from './components/routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <body class="relative bg-black h-screen w-full bg-image-chip">
          <Nav />
          <Routes />
        </body>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
