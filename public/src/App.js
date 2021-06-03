// Import routing stuff
import { BrowserRouter } from 'react-router-dom';
// Import components
import Nav    from './components/nav';
import Routes from './components/routes';

function App() {
  return (
    <BrowserRouter>
    <body class="relative bg-black h-screen w-full bg-image-chip">
      <Nav />
      <Routes />
    </body>
    </BrowserRouter>
  );
}

export default App;
