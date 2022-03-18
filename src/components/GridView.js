import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoDialog from 'components/TodoDialog';
import ConfirmDialog from 'components/ConfirmDialog';
import { AppContext } from 'contexts/AppContext';
import { getFormattedDate } from 'utils/date';

export default function GridView() {
  const { todos, editTodo, deleteTodo } = useContext(AppContext);
  const theme = useTheme();
  const [openTodoDialog, setOpenTodoDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleSaveTodo = (item) => {
    if (item) {
      editTodo(item);
    }
    setOpenTodoDialog(false);
  };

  const handleDeleteTodo = () => {
    if (currentItem) {
      deleteTodo(currentItem.id);
    }
    setOpenConfirmDialog(false);
  };

  const handleEditBtnClick = (item) => {
    setCurrentItem(item);
    setOpenTodoDialog(true);
  };

  const handleDeleteBtnClick = (item) => {
    setCurrentItem(item);
    setOpenConfirmDialog(true);
  };

  return (
    <Grid container spacing={2}>
      {todos.map((todo, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                title={todo.description}
                sx={{
                  maxWidth: '100%',
                  height: theme.spacing(8),
                  lineHeight: theme.spacing(6),
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
                gutterBottom
              >
                {todo.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: theme.spacing(2),
                }}
              >
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  {todo.state}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {getFormattedDate(todo.dueDate)}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton size="small" onClick={() => handleEditBtnClick(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDeleteBtnClick(todo)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {openTodoDialog && (
        <TodoDialog
          open={openTodoDialog}
          handleCancel={() => setOpenTodoDialog(false)}
          handleSave={handleSaveTodo}
          todo={currentItem}
        />
      )}
      {openConfirmDialog && (
        <ConfirmDialog
          open={openConfirmDialog}
          handleCancel={() => setOpenConfirmDialog(false)}
          handleConfirm={handleDeleteTodo}
        />
      )}
    </Grid>
  );
}
