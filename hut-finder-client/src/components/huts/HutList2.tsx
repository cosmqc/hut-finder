import HutCard from '@/components/huts/HutCard2.tsx'

const HutList = (props: { huts: Hut[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full h-full">
      {props.huts.map((hut) => (
        <HutCard hut={hut} key={hut.id} />
      ))}
    </div>
  )
}

export default HutList
