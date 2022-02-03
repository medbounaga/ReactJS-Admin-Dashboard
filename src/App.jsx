import { NavBar } from './components';
import ModalManager from './containers/ModalManager';
import { Dashboard, Orders } from './pages';
import './styles/globals.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ModalManager />
        <NavBar />
        <div className='mainContent'>
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
