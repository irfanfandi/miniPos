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

export default function cardProducts() {
  var currencyFormatter = require('currency-formatter');
  const [dataProduct, setdataProduct] = React.useState([]);

  React.useEffect(() => {
    // Jika data pada localstore ada, maka dataProduct state di set dengan data localstore
    localStorage.getItem('dataProduct') &&
      setdataProduct(JSON.parse(localStorage.getItem('dataProduct')));
  }, []);

  // Add data
  const saveData = () => {
    // Jika typeSubmit === add maka yg di jalankan insert data baru, jika tidak maka update data berdasarkan id
    if (typeSubmit === 'add') {
      const id = uuidv4();
      const newCategory = {id, name: payload.name};
      setdataProduct([...dataProduct, newCategory]);
      localStorage.setItem(
        'dataProduct',
        JSON.stringify([...dataProduct, newCategory]),
      );
    } else {
      // Mencari index array yg akan di ganti datanya
      const indexData = dataProduct.findIndex(
        category => category.id === payload.id,
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
              <TableCell>Name Product</TableCell>
              <TableCell>Price Product</TableCell>
              <TableCell>Name Category</TableCell>
              <TableCell></TableCell>
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
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="add"
                        onClick={() => {
                          setTypeSubit('update'),
                            setPayload(row),
                            setHandleModal(true);
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
