import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function TodoDialog({
  open,
  handleCancel,
  handleSave,
  todo = {},
}) {
  const theme = useTheme();
  const [description, setDescription] = useState(todo.description || '');
  const [dueDate, setDueDate] = useState(todo.dueDate || new Date().valueOf());
  const [state, setState] = useState(todo.state || 'TODO');
  const [helperText, setHelperText] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setHelperText('');
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const onSave = () => {
    if (!description.trim()) {
      setHelperText('This Field is required!');
    } else {
      handleSave({ ...todo, description, dueDate, state });
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{todo.id ? 'Edit Todo' : 'Add ToDo'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          value={description}
          onChange={handleDescriptionChange}
          error={!!helperText}
          helperText={helperText}
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          sx={{ mb: theme.spacing(4) }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              variant="contained"
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  sx={{ width: '50%' }}
                  size="small"
                />
              )}
            />
          </LocalizationProvider>
          <FormControl variant="filled" size="small" sx={{ width: '45%' }}>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="state-selector"
              value={state}
              label="State"
              onChange={handleStateChange}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
