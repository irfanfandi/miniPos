import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';
import CardProduct from './cardProducts';

export default function cardTransaction() {
  var currencyFormatter = require('currency-formatter');
  const [dataTransaction, setdataTransaction] = React.useState('');
  const [handleModal, setHandleModal] = React.useState(false);
  const initialPayload = {
    id: uuidv4(),
    status_billing: false, //status billing, jika true artinya sudah bayar
    total: 0,
    item_order: [],
  };
  const [payload, setPayload] = React.useState(initialPayload);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  React.useEffect(() => {
    // Jika data pada localstore ada, maka dataTransaction state di set dengan data localstore
    localStorage.setItem('dataTransaction', JSON.stringify(initialPayload));
    localStorage.getItem('dataTransaction') &&
      setdataTransaction(JSON.parse(localStorage.getItem('dataTransaction')));
    console.log(dataTransaction, 'sa');
  }, []);

  // Add data
  const handleAddProduct = dataItem => {
    // Push data item dari parameter yang di kirim dari props
    dataTransaction.item_order.push(dataItem);
    dataTransaction.total = dataTransaction.total + dataItem.price;
    setdataTransaction(dataTransaction);
    forceUpdate();
    localStorage.setItem('dataTransaction', JSON.stringify(dataTransaction));
    Swal.fire({
      icon: 'success',
      text: 'You have successfully add data!',
    });
  };

  const submitPayment = () => {};

  // Delete data
  const deleteData = id => {
    const deleteData = dataTransaction.filter(category => category.id !== id);
    setdataTransaction(deleteData);
    Swal.fire({
      icon: 'success',
      text: 'You have successfully deleted data!',
    });
    localStorage.setItem('dataTransaction', JSON.stringify(deleteData));
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom>
              List Order
            </Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{minWidth: 650}}
                stickyHeaderstickyHeader
                aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTransaction &&
                    dataTransaction.item_order.map(row => {
                      return (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': {border: 0},
                          }}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            {currencyFormatter.format(row.price, {code: 'IDR'})}
                          </TableCell>
                          <TableCell>
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
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>
                      {currencyFormatter.format(dataTransaction.total, {
                        code: 'IDR',
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
                    onChange={event =>
                      onInputChange('name', event.target.value)
                    }
                  />
                  <Button variant="contained" onClick={submitPayment}>
                    Save
                  </Button>
                </Grid>
              </FormControl>
            </Modal>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
            <CardProduct
              onAddProduct={val => {
                handleAddProduct(val);
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
