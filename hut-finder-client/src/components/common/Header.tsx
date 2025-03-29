import {Box, Button, IconButton, Stack, Tooltip, useColorScheme} from '@mui/joy';
import {CabinRounded, DarkModeRounded, LightModeRounded} from '@mui/icons-material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const ToggleColourScheme = () => {
  const {mode, setMode} = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size='sm'
        variant='outlined'
        color='primary'/>
    );
  }
  return (
    <Tooltip title={mode === 'light' ? 'Dark Mode' : 'Light Mode'}>
      <IconButton
        data-screenshot='toggle-mode'
        size='sm'
        variant='plain'
        color='neutral'
        sx={{
          alignSelf: 'center',
        }}
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkModeRounded/> : <LightModeRounded/>}
      </IconButton>
    </Tooltip>
  );
}

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        p: 2,
        gap: 2,
        bgcolor: 'background.surface',
        flexDirection: 'row',
        alignItems: 'center',
        gridColumn: '1 / -1',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%',
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: {
            xs: 'none',
            sm: 'flex'
          },
      }}>
        <IconButton
          size='md'
          variant='outlined'
          color='neutral'
          sx={{
            display: {
              xs: 'none',
              sm: 'inline-flex',
            },
            borderRadius: '50%',
          }}
          onClick={() => navigate('/')}
        >
          <CabinRounded/>
        </IconButton>
        <Button
          variant='plain'
          color='neutral'
          aria-pressed='true'
          component='a'
          onClick={() => navigate('/huts')}
          size='sm'
          sx={{
            alignSelf: 'center',
          }}>
          Huts
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <ToggleColourScheme/>
      </Box>
    </Box>
  )
}

export default Header;