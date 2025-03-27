import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BrowseHuts from './pages/huts/BrowseHuts.tsx';
import Header from './components/common/Header.tsx';
import {Box, CssBaseline, CssVarsProvider} from '@mui/joy';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box className='App'  sx={{width: '100%'}}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/huts' element={<BrowseHuts/>}/>
          </Routes>
        </BrowserRouter>
      </Box>
    </CssVarsProvider>

  );
}

export default App;
