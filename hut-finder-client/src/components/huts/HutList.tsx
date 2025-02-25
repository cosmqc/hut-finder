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
      sx={{width: '100%', justifyContent: 'center'}}
    >
      {props.huts.map((hut: Hut) => (
        <Grid
          key={hut.id}
          xs={12}
          sm={6}
          md={4}
          display="flex"
          justifyContent="center"
        >
          <HutCard
            hut={hut}
            variant="outlined"
            color="primary"
            sx={{
              width: '100%',
              maxWidth: 320,
              '&:hover': {boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder'},
            }}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default HutList;