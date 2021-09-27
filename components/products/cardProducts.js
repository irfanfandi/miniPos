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
import MenuItem from '@mui/material/MenuItem';

export default function cardCategory() {
  var currencyFormatter = require('currency-formatter');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [handleModal, setHandleModal] = React.useState(false);
  const [dataProduct, setdataProduct] = React.useState([]);
  const [dataCategory, setDataCategory] = React.useState([]);
  const [typeSubmit, setTypeSubit] = React.useState('');
  const initialPayload = {
    id: 0,
    name: '',
    price: 0,
    category: '',
  };
  const [payload, setPayload] = React.useState(initialPayload);

  React.useEffect(() => {
    // Jika data pada localstore ada, maka dataProduct state di set dengan data localstore
    localStorage.getItem('dataProduct') &&
      setdataProduct(JSON.parse(localStorage.getItem('dataProduct')));
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
      const newProduct = {...payload, id};
      setdataProduct([...dataProduct, newProduct]);
      localStorage.setItem(
        'dataProduct',
        JSON.stringify([...dataProduct, newProduct]),
      );
    } else {
      // Mencari index array yg akan di ganti datanya
      const indexData = dataProduct.findIndex(
        product => product.id === payload.id,
      );
      dataProduct[indexData] = payload;
      localStorage.setItem('dataProduct', JSON.stringify(dataProduct));
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
    const deleteData = dataProduct.filter(product => product.id !== id);
    setdataProduct(deleteData);
    Swal.fire({
      icon: 'success',
      text: 'You have successfully deleted data!',
    });
    localStorage.setItem('dataProduct', JSON.stringify(deleteData));
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{mb: 4}}>
        <Grid item xs={10}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            List Products
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={() => {
              setTypeSubit('add'),
                setHandleModal(true),
                setDataCategory(
                  JSON.parse(localStorage.getItem('dataCategory')),
                );
            }}>
            Add Product
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProduct &&
              dataProduct
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        {currencyFormatter.format(row.price, {code: 'IDR'})}
                      </TableCell>
                      <TableCell>{row.category}</TableCell>
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
        {dataProduct && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={dataProduct.length}
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
              label="Name product"
              value={payload.name}
              onChange={event => onInputChange('name', event.target.value)}
            />
            <TextField
              required
              id="demo-helper-text-misaligned-no-helper"
              label="Price product"
              value={payload.price}
              type="number"
              onChange={event =>
                onInputChange('price', parseInt(event.target.value))
              }
            />
            <TextField
              select
              id="demo-helper-text-misaligned-no-helper"
              label="Category product"
              value={payload.category}
              onChange={event => onInputChange('category', event.target.value)}>
              {dataCategory.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={saveData}>
              Save
            </Button>
          </Grid>
        </FormControl>
      </Modal>
    </React.Fragment>
  );
}
