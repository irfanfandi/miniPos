import React from 'react';
import CardCategory from '../../components/products/cardCategory';
import CardProduct from '../../components/products/cardProducts';
import Grid from '@mui/material/Grid';
import MainLayout from '../../layout/mainLayout';
import Paper from '@mui/material/Paper';

export default function index() {
  return (
    <MainLayout
      title="Products"
      content={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
              <CardCategory />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
              <CardProduct />
            </Paper>
          </Grid>
        </Grid>
      }
    />
  );
}
