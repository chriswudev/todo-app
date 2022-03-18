import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import Toolbar from 'components/Toolbar';
import ListView from 'components/ListView';
import GridView from 'components/GridView';
import { AppContext } from 'contexts/AppContext';

export default function Container() {
  const theme = useTheme();
  const { viewMode } = useContext(AppContext);

  return (
    <MuiContainer maxWidth="lg">
      <Box sx={{ marginTop: theme.spacing(8) }}>
        <Toolbar />
        {viewMode === 'list' ? <ListView /> : <GridView />}
      </Box>
    </MuiContainer>
  );
}
