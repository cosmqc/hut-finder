import React from 'react'
import { TentTree } from 'lucide-react'

const HutImage = (hut: Hut): React.ReactNode => {
  return (
    <div className="relative w-full h-full">
      {hut.imageUrl && !hut.imageUrl.includes('no-photo') ? (
        <img
          src={hut.imageUrl}
          alt={hut.name}
          loading="lazy"
          className="absolute w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="absolute w-full h-full flex justify-center items-center bg-gray-200 rounded-lg">
          <TentTree className="w-1/4 h-1/4" />
        </div>
      )}
    </div>
  )
}

export default HutImage
