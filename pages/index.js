import React from 'react';
import CardTransaction from '../components/transaction/cardTransaction';
import MainLayout from '../layout/mainLayout';

export default function index() {
  return <MainLayout title="Transaction" content={<CardTransaction />} />;
}
