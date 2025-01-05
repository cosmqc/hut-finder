import {Box} from '@mui/joy';
import HutCard from './HutCard.tsx';

interface HutListProps {
  huts: Hut[]
}

const HutList = (props: HutListProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 2,
      }}
    >
      {props.huts.map((hut: Hut) => (
          <HutCard hut={hut} variant='outlined'/>
      ))}
    </Box>
  )
}

export default HutList;