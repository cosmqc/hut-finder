import {Grid} from '@mui/joy';
import HutCard from './HutCard.tsx';

interface HutListProps {
  huts: Hut[];
}

const HutList = (props: HutListProps) => {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      sx={{
        width: '100%',
        justifyContent: 'stretch',
        paddingX: '10px',
      }}
    >
      {props.huts.map((hut: Hut) => (
        <Grid
          key={hut.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          display='flex'
        >
          <HutCard
            hut={hut}
            variant='outlined'
            color='primary'
            sx={{
              flexGrow: 1,
              width: '100%',
              '&:hover': {
                boxShadow: 'md',
                borderColor: 'neutral.outlinedHoverBorder'
              },
            }}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default HutList;