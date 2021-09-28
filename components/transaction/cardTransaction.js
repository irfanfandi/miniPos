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
  const [dataBilling, setdataBilling] = React.useState([]);
  const initialPayload = {
    id: uuidv4(),
    total: 0,
    item_order: [],
  };
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  const resetDataTransaction = () => {
    setdataTransaction(initialPayload);
    localStorage.setItem('dataTransaction', JSON.stringify(initialPayload));
  };

  React.useEffect(() => {
    // Jika data pada localstore ada, maka dataTransaction state di set dengan data localstore jika tidak maka di set dengan initialdata
    localStorage.getItem('dataTransaction') !== null
      ? setdataTransaction(JSON.parse(localStorage.getItem('dataTransaction')))
      : resetDataTransaction();

    // Set data Biling
    localStorage.getItem('dataBilling') &&
      setdataBilling(JSON.parse(localStorage.getItem('dataBilling')));
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

  const submitPayment = () => {
    setdataBilling([...dataBilling, dataTransaction]);
    localStorage.setItem(
      'dataBilling',
      JSON.stringify([...dataBilling, dataTransaction]),
    );
    Swal.fire({
      icon: 'success',
      text: 'You have successfully payment order!',
    });
    // Clear data transaction
    resetDataTransaction();
  };

  // Delete data
  const deleteData = (id, price) => {
    const deleteData = dataTransaction.item_order.filter(
      transaction => transaction.id !== id,
    );
    // update data item order dan total order
    dataTransaction.item_order = deleteData;
    dataTransaction.total = dataTransaction.total - price;
    setdataTransaction(dataTransaction);
    forceUpdate();
    Swal.fire({
      icon: 'success',
      text: 'You have successfully deleted data!',
    });
    localStorage.setItem('dataTransaction', JSON.stringify(dataTransaction));
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
                    <TableCell sx={{width: '25%'}}>Name</TableCell>
                    <TableCell sx={{width: '25%'}}>Price</TableCell>
                    <TableCell sx={{width: '50%'}}>Action</TableCell>
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
                                deleteData(row.id, row.price);
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
            {dataTransaction.total > 0 && (
              <Button
                sx={{mt: 2}}
                variant="contained"
                onClick={() => {
                  submitPayment();
                }}>
                Pay order
              </Button>
            )}
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
