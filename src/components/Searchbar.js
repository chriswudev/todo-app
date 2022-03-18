import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from 'contexts/AppContext';

export default function Searchbar() {
  const { handleSearch } = useContext(AppContext);
  const theme = useTheme();
  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };
  return (
    <Paper
      sx={{
        display: 'flex',
        width: 400,
        mr: theme.spacing(4),
      }}
    >
      <Box sx={{ p: theme.spacing(1), display: 'flex' }}>
        <SearchIcon />
      </Box>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search ToDo by description"
        inputProps={{ 'aria-label': 'Search ToDo by description' }}
        onChange={handleInputChange}
      />
    </Paper>
  );
}
