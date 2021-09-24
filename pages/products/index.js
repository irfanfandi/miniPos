import React from 'react'
import CardCategory from './cardCategory'
import CardProduct from './cardProducts'
import Grid from "@mui/material/Grid";
import MainLayout from "../../layout/mainLayout";

export default function index() {
  return (<MainLayout title="Products" content={
      <Grid container spacing={2}>
  <Grid item xs={6}>
    <CardCategory/>
  </Grid>
  <Grid item xs={6}>
      <CardProduct/>
  </Grid>
</Grid>
  }/>
  )
}
