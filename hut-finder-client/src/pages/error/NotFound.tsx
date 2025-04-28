import {Box, Button, Typography} from '@mui/joy';
import {useEffect} from 'react';
import {ArrowBackIos} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Not Found';
  });
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
    }}>
      <Box sx={{textAlign: 'center'}}>
        <Typography
          level = 'h1'
          sx={{padding: '1rem'}}
        >
          We couldn't find the page you were looking for.
        </Typography>
        <Button
          startDecorator={<ArrowBackIos/>}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;