import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getHutById} from '../../services/Huts.ts';
import {
  Box,
  Breadcrumbs, Button,
  CircularProgress,
  Link,
  List,
  ListItem,
  Typography
} from '@mui/joy';
import {ChevronRightRounded, HomeRounded, OpenInNew} from '@mui/icons-material';
import HutCategoryChip from '../../components/huts/HutCategoryChip.tsx';

const HutDetails = () => {
  const {id} = useParams();
  const [hut, setHut] = useState<Hut>({
    id: -1,
    globalId: '',
    name: '',
    location: '',
    imageUrl: '',
    hutUrl: '',
    region: '',
    facilities: [],
    lat: -1,
    lon: -1,
    bookable: false,
    category: -1,
  });
  const [mounted, setMounted] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHutDetails = async () => {
      try {
        const data: Hut = await getHutById(parseInt(id!, 10));
        setHut(data);
        document.title = data.name;
        setMounted(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        navigate('/notFound');
      }
    }
    fetchHutDetails();
  }, []);

  useEffect(() => {

  }, [mounted]);

  return (
    <Box>
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
            <CircularProgress variant='solid' size='lg' />
            <Typography>Loading Hut...</Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            padding: 2
          }}
        >
          <Box>
            <Breadcrumbs
              size='sm'
              aria-label='breadcrumbs'
              separator={<ChevronRightRounded/>}
              sx={{pl: 0}}
            >
              <Link
                underline='none'
                color='neutral'
                href='/'
                aria-label='Home'
              >
                <HomeRounded />
              </Link>
              <Link
                underline='hover'
                color='neutral'
                href={'/huts'}
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Huts
              </Link>
              <Typography color='primary' sx={{ fontWeight: 500, fontSize: 12 }}>
                {hut.name}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              textAlign: 'left'
            }}
          >
            <Typography level='h1'>{hut.name}</Typography>
            {HutCategoryChip(hut.category)}
            <Typography>{hut.location}, {hut.region}</Typography>
            <List>
              <Typography level='h3'>Facilities</Typography>
              {hut.facilities.map((facility: string) => (
                <ListItem>
                  <Typography>
                    {facility}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Button component='a' href={hut.hutUrl} startDecorator={<OpenInNew />}>
              View on DOC Website
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );

}

export default HutDetails;