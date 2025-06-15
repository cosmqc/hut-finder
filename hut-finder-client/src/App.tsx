import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/error/NotFound.tsx'
import HutDetails from './pages/huts/HutDetails.tsx'
import Header from '@/components/common/Header.tsx'
import BrowseHuts from '@/pages/huts/BrowseHuts.tsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/huts" element={<BrowseHuts />} />
          <Route path="/notFound" element={<NotFound />} />
          <Route path="/huts/:id" element={<HutDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
