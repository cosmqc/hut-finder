import React from 'react'
import { TentTree } from 'lucide-react'

const HutImage = (hut: Hut): React.ReactNode => {
  if (
    hut.imageUrl === null ||
    hut.imageUrl === '' ||
    hut.imageUrl.includes('no-photo')
  ) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <TentTree />
      </div>
    )
  }
  return (
    <img
      src={hut.imageUrl}
      alt={hut.name}
      loading="lazy"
      className="rounded-lg"
    />
  )
}

export default HutImage
