import {useEffect, useState} from 'react';
import HutList from '../../components/huts/HutList.tsx';
import {getHuts} from '../../services/Huts.ts';
import {Box, CircularProgress, Typography} from '@mui/joy';

const BrowseHuts = () => {
  const [huts, setHuts] = useState<Hut[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    const fetchHuts = async () => {
      try {
        const data: Hut[] = await getHuts();
        setHuts(data);
        setMounted(true);
      } catch (err) {
        console.error(err);
        setMounted(true);
        setError('Failed to fetch huts. Please try again later.');
      }
    }
    document.title = 'Browse Huts';
    fetchHuts();
  }, []);

  useEffect(() => {

  }, [mounted]);

  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          padding: 2,
        }}
      >
        {error}
      </Box>
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '10px',
        display: 'flex',
        paddingX: '10px',
        flexGrow: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      {!mounted ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box>
            <CircularProgress variant='solid' size='lg'/>
            <Typography>Loading Huts...</Typography>
          </Box>
        </Box>
      ) : (
        <HutList huts={huts} />
      )}
    </Box>
  )

}

export default BrowseHuts;