import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import 'react-responsive-modal/styles.css';
import EyeIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import {Modal} from 'react-responsive-modal';
import MainLayout from '../../layout/mainLayout';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function index() {
  var currencyFormatter = require('currency-formatter');
  const [dataBilling, setdataBilling] = React.useState([]);
  const [dataBillingDetail, setdataBillingDetail] = React.useState([]);
  const [handleModal, setHandleModal] = React.useState(false);

  React.useEffect(() => {
    // Jika data pada localstore ada, maka dataBilling state di set dengan data localstore
    localStorage.getItem('dataBilling') &&
      setdataBilling(JSON.parse(localStorage.getItem('dataBilling')));
  }, []);

  // Add data
  const showDetailBilling = id => {
    const dataFilter = dataBilling.filter(billing => billing.id === id);
    setdataBillingDetail(dataFilter[0].item_order);
    setHandleModal(true);
  };

  return (
    <MainLayout
      title="Transaction"
      content={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom>
                  List Billing
                </Typography>
                <TableContainer component={Paper}>
                  <Table
                    sx={{minWidth: 650}}
                    stickyHeaderstickyHeader
                    aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id Billing</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataBilling &&
                        dataBilling.map(row => {
                          return (
                            <TableRow
                              key={row.id}
                              sx={{
                                '&:last-child td, &:last-child th': {border: 0},
                              }}>
                              <TableCell>{row.id}</TableCell>
                              <TableCell>
                                {currencyFormatter.format(row.total, {
                                  code: 'IDR',
                                })}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  aria-label="add"
                                  onClick={() => {
                                    showDetailBilling(row.id);
                                  }}>
                                  <EyeIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Modal
                  open={handleModal}
                  onClose={() => {
                    setHandleModal(false);
                  }}
                  center>
                  <Grid
                    container
                    direction="column"
                    sx={{
                      display: 'flex',
                      '& > :not(style)': {m: 1, mt: 4},
                    }}>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{minWidth: 650}}
                        stickyHeaderstickyHeader
                        aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name Product</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataBillingDetail &&
                            dataBillingDetail.map(row => {
                              return (
                                <TableRow
                                  key={row.id}
                                  sx={{
                                    '&:last-child td, &:last-child th': {
                                      border: 0,
                                    },
                                  }}>
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell>{row.category}</TableCell>
                                  <TableCell>
                                    {currencyFormatter.format(row.price, {
                                      code: 'IDR',
                                    })}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Modal>
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>
      }
    />
  );
}
