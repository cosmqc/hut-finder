import {useEffect, useState} from 'react';
import HutList from '../../components/huts/HutList.tsx';
import {getHuts} from '../../services/Huts.ts';
import {Box, CircularProgress, Typography} from '@mui/joy';
import SearchSidebar from '../../components/common/Sidebar.tsx';
import {SortMethod} from '../../types/Constants.ts';

const BrowseHuts = () => {
  const [searchResult, setSearchResult] = useState<HutSearchResponse>({
    categories: [],
    results: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortMethod, setSortMethod] = useState<string>(SortMethod.ALPHABETICAL_ASC);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const fetchHuts = async () => {
    try {
      setSidebarLoading(true);
      const data: HutSearchResponse = await getHuts(search, selectedCategories, sortMethod);
      setSearchResult(data);
      setMounted(true);
      setSidebarLoading(false);
    } catch (err) {
      console.error(err);
      setMounted(true);
      setError('Failed to fetch huts. Please try again later.');
    }
  }
  useEffect(() => {

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
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <SearchSidebar
        onSearch={setSearch}
        onSelectedCategories={setSelectedCategories}
        onSortMethod={setSortMethod}
        categories={searchResult.categories}
        loading={sidebarLoading}
        search={fetchHuts}
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
          <HutList huts={searchResult.results} />
        )}
      </Box>
    </Box>
  );

}

export default BrowseHuts;