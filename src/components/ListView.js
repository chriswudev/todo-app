import { useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoDialog from 'components/TodoDialog';
import ConfirmDialog from 'components/ConfirmDialog';
import { AppContext } from 'contexts/AppContext';
import { getFormattedDate } from 'utils/date';

const headCells = [
  {
    id: 'id',
    align: 'left',
    label: 'ID',
  },
  {
    id: 'description',
    align: 'left',
    label: 'Description',
  },
  {
    id: 'dueDate',
    align: 'center',
    label: 'Due Date',
  },
  {
    id: 'state',
    align: 'center',
    label: 'State',
  },
  {
    id: 'actions',
    align: 'center',
    label: 'Actions',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ListView() {
  const { todos, editTodo, deleteTodo } = useContext(AppContext);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openTodoDialog, setOpenTodoDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todos.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(todos, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell
                        align="left"
                        title={row.description}
                        sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 200 }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="center">
                        {getFormattedDate(row.dueDate)}
                      </TableCell>
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleEditBtnClick(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteBtnClick(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={todos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
    </Box>
  );
}
