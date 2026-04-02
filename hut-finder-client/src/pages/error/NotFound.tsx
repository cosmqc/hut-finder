import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Not Found'
  })
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        We couldn't find the page you were looking for.
      </h3>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  )
}

export default NotFound
