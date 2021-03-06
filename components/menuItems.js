/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useRouter} from 'next/router';

export default function menuItems() {
  const router = useRouter();
  return (
    <div>
      <ListItem button component="div" onClick={() => router.push('/')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Transaction" />
      </ListItem>
      <ListItem button component="div" onClick={() => router.push('/billing')}>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItem>
      <ListItem button component="div" onClick={() => router.push('/products')}>
        <ListItemIcon>
          <AddBusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
    </div>
  );
}
