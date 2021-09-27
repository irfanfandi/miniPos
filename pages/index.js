import React from 'react';
import CardTransaction from '../components/transaction/cardTransaction';
import CardProduct from '../components/transaction/cardProducts';
import Grid from '@mui/material/Grid';
import MainLayout from '../layout/mainLayout';
import Paper from '@mui/material/Paper';

export default function index() {
  return (
    <MainLayout
      title="Transaction"
      content={
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
              <CardTransaction />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
              <CardProduct />
            </Paper>
          </Grid>
        </Grid>
      }
    />
  );
}
