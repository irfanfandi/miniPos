import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function cardCategory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = [
    {id:1,nama:'Ikan'},
    {id:1,nama:'Ikan'},
    {id:1,nama:'Ikan'},
    {id:1,nama:'Ikan'},
    {id:1,nama:'Ikan'}
   ];
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
      List Category
      </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} stickyHeaderstickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id Kategori</TableCell>
                  <TableCell>Nama Kategori</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell >{row.nama}</TableCell>
                  </TableRow>
                );
              })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          </React.Fragment>
  );
}
