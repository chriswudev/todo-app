import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Toolbar from 'components/Toolbar';
import ListView from 'components/ListView';
import GridView from 'components/GridView';
import { AppContext } from 'contexts/AppContext';

export default function Container() {
  const theme = useTheme();
  const { viewMode, todos } = useContext(AppContext);

  return (
    <MuiContainer maxWidth="lg">
      <Box sx={{ marginTop: theme.spacing(8) }}>
        <Toolbar />
        {todos.length ? (
          viewMode === 'list' ? (
            <ListView />
          ) : (
            <GridView />
          )
        ) : (
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', mt: theme.spacing(8) }}
          >
            You don't have any ToDos yet!
          </Typography>
        )}
      </Box>
    </MuiContainer>
  );
}
