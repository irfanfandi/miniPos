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
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';

export default function cardProducts(props) {
  var currencyFormatter = require('currency-formatter');
  const [dataProduct, setdataProduct] = React.useState([]);

  React.useEffect(() => {
    // Jika data pada localstore ada, maka dataProduct state di set dengan data localstore
    localStorage.getItem('dataProduct') &&
      setdataProduct(JSON.parse(localStorage.getItem('dataProduct')));
  }, []);

  // Add data
  const addProduct = data => {
    props.onAddProduct(data);
    Swal.fire({
      icon: 'success',
      text: 'You have successfully add data!',
    });
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        List Products
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
            {dataProduct &&
              dataProduct.map(row => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {currencyFormatter.format(row.price, {code: 'IDR'})}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="add"
                        onClick={() => {
                          addProduct(row);
                        }}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
