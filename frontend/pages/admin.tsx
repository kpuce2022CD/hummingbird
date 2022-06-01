import { NextPage } from 'next';
import React from 'react';
import AdminTable from '../components/AdminPage/AdminTable';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const admin: NextPage = () => {
  return (
    <>
      <Nav />
      <AdminTable />
    </>
  );
};

export default admin;
