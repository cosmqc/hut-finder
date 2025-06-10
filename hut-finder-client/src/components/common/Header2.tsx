import { Button } from '@/components/ui/button.tsx'
import { TentTree } from 'lucide-react'
import { Link } from 'react-router'

const Header2 = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full flex py-4 border-b-1">
      <div className="container-wrapper 3xl:fixed:px-0 px-6 flex flex-row items-center">
        <nav className="items-center gap-0.5 hidden lg:flex justify-start">
          <Button size="icon" variant="ghost">
            <Link to="/">
              <TentTree />
            </Link>
          </Button>
          <Button variant="ghost">
            <Link to="/huts">Huts</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header2
