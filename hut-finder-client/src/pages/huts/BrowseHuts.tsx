import {useEffect, useState} from 'react';
import HutList from '../../components/huts/HutList.tsx';
import {getHuts} from '../../services/Huts.ts';
import {Box, CircularProgress, Typography} from '@mui/joy';
import SearchSidebar from '../../components/common/Sidebar.tsx';

const BrowseHuts = () => {
  const [huts, setHuts] = useState<Hut[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  useEffect(() => {
    const fetchHuts = async () => {
      try {
        const data: Hut[] = await getHuts(search, selectedCategories);
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
  }, [search, selectedCategories]);

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
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <SearchSidebar
        onSearch={setSearch}
        onSelectedCategories={setSelectedCategories}
      />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
        }}
      >
        {!mounted ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Box>
              <CircularProgress variant="solid" size="lg" />
              <Typography>Loading Huts...</Typography>
            </Box>
          </Box>
        ) : (
          <HutList huts={huts} />
        )}
      </Box>
    </Box>
  );

}

export default BrowseHuts;