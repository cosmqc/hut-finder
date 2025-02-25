import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BrowseHuts from './pages/huts/BrowseHuts.tsx';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/huts' element={<BrowseHuts/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
