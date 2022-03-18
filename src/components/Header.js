import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from 'contexts/ColorModeContext';

export default function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <AppBar color="primary" sx={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 1200 }}>
        <Typography variant="h6" color="inherit" noWrap>
          ToDo App
        </Typography>
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
