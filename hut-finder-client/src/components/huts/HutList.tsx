import HutCard from '@/components/huts/HutCard.tsx'
import { pluraliseWord } from '@/components/common/Util.ts'

const HutList = (props: { huts: Hut[] }) => {
  if (props.huts) {
    return (
      <div className="flex flex-col">
        <header className="pb-3">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {pluraliseWord(props.huts.length, 'result')}
          </h4>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full">
          {props.huts.map((hut) => (
            <HutCard hut={hut} key={hut.id} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        No results found.
      </h4>
    </div>
  )
}

export default HutList
