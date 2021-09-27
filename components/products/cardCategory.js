import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';

export default function cardCategory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [handleModal, setHandleModal] = React.useState(false);
  const [dataCategory, setDataCategory] = React.useState([]);
  const [typeSubmit, setTypeSubit] = React.useState('');
  const initialPayload = {
    id: 0,
    name: '',
  };
  const [payload, setPayload] = React.useState(initialPayload);

  React.useEffect(() => {
    // Jika data pada localstore ada, maka dataCategory state di set dengan data localstore
    localStorage.getItem('dataCategory') &&
      setDataCategory(JSON.parse(localStorage.getItem('dataCategory')));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // handle input form
  const onInputChange = (type, val) => {
    setPayload(prevState => ({
      ...prevState,
      [type]: val,
    }));
  };

  // Add data
  const saveData = () => {
    // Jika typeSubmit === add maka yg di jalankan insert data baru, jika tidak maka update data berdasarkan id
    if (typeSubmit === 'add') {
      const id = uuidv4();
      const newCategory = {id, name: payload.name};
      setDataCategory([...dataCategory, newCategory]);
      localStorage.setItem(
        'dataCategory',
        JSON.stringify([...dataCategory, newCategory]),
      );
    } else {
      // Mencari index array yg akan di ganti datanya
      const indexData = dataCategory.findIndex(
        category => category.id === payload.id,
      );
      dataCategory[indexData] = payload;
      localStorage.setItem('dataCategory', JSON.stringify(dataCategory));
    }
    Swal.fire({
      icon: 'success',
      text: 'You have successfully add data!',
    });
    setPayload(initialPayload);
    setHandleModal(false);
  };

  // Delete data
  const deleteData = id => {
    const deleteData = dataCategory.filter(category => category.id !== id);
    setDataCategory(deleteData);
    Swal.fire({
      icon: 'success',
      text: 'You have successfully deleted data!',
    });
    localStorage.setItem('dataCategory', JSON.stringify(deleteData));
  };
  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{mb: 4}}>
        <Grid item xs={10}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            List Categorys
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={() => {
              setTypeSubit('add'), setHandleModal(true);
            }}>
            Add Category
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table
          sx={{minWidth: 650}}
          stickyHeaderstickyHeader
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Id Category</TableCell>
              <TableCell>Name Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCategory &&
              dataCategory
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setTypeSubit('update'),
                              setPayload(row),
                              setHandleModal(true);
                          }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteData(row.id);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        {dataCategory && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={dataCategory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
      <Modal
        open={handleModal}
        onClose={() => {
          setHandleModal(false);
        }}
        center>
        <FormControl>
          <Grid
            container
            direction="column"
            sx={{
              display: 'flex',
              '& > :not(style)': {m: 1, mt: 4},
            }}>
            <TextField
              required
              id="demo-helper-text-misaligned-no-helper"
              label="Name category"
              value={payload.name}
              onChange={event => onInputChange('name', event.target.value)}
            />
            <Button variant="contained" onClick={saveData}>
              Save
            </Button>
          </Grid>
        </FormControl>
      </Modal>
    </React.Fragment>
  );
}
