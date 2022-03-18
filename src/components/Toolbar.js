import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MuiToolbar from '@mui/material/Toolbar';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import TableRows from '@mui/icons-material/TableRows';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import TodoDialog from 'components/TodoDialog';
import Searchbar from 'components/Searchbar';
import { AppContext } from 'contexts/AppContext';

export default function Toolbar() {
  const theme = useTheme();
  const { viewMode, setViewMode, addTodo } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (todo) => {
    addTodo(todo);
    setOpen(false);
  };

  const handleViewModeChange = (e, value) => {
    setViewMode(value);
  };

  return (
    <MuiToolbar sx={{ justifyContent: 'flex-end', mb: theme.spacing(2) }}>
      <Searchbar />
      <ToggleButtonGroup
        size="small"
        value={viewMode}
        onChange={handleViewModeChange}
        color="primary"
        exclusive
        sx={{ mr: theme.spacing(4) }}
      >
        <ToggleButton value="list">
          <TableRows />
        </ToggleButton>
        <ToggleButton value="grid">
          <ViewComfyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      {open && (
        <TodoDialog
          open={open}
          handleCancel={handleClose}
          handleSave={handleSave}
        />
      )}
    </MuiToolbar>
  );
}
