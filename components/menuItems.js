/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useRouter } from 'next/router'


export default function menuItems() {
  const router = useRouter()
  return (  
  <div>
    <ListItem button component="div" onClick={() => router.push('/')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component="div" onClick={() => router.push('/billing')}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Billing" />
    </ListItem>
    <ListItem button component="div" onClick={() => router.push('/products')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
  </div>
  )
}
