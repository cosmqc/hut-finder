import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BrowseHuts from './pages/huts/BrowseHuts.tsx'
import NotFound from './pages/error/NotFound.tsx'
import HutDetails from './pages/huts/HutDetails.tsx'
import BrowseHuts2 from '@/pages/huts/BrowseHuts2.tsx'
import Header2 from '@/components/common/Header2.tsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header2 />
        <Routes>
          <Route path="/huts" element={<BrowseHuts2 />} />
          <Route path="/huts1" element={<BrowseHuts />} />
          <Route path="/notFound" element={<NotFound />} />
          <Route path="/huts/:id" element={<HutDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
