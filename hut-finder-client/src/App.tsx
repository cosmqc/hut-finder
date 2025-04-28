import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BrowseHuts from './pages/huts/BrowseHuts.tsx';
import Header from './components/common/Header.tsx';
import {Box, CssBaseline, CssVarsProvider} from '@mui/joy';
import NotFound from './pages/error/NotFound.tsx';
import HutDetails from './pages/huts/HutDetails.tsx';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box className='App'  sx={{width: '100%'}}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/huts' element={<BrowseHuts/>}/>
            <Route path='/notFound' element={<NotFound/>}/>
            <Route path='/huts/:id' element={<HutDetails/>}/>

          </Routes>
        </BrowserRouter>
      </Box>
    </CssVarsProvider>

  );
}

export default App;
