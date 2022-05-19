import { NextPage } from 'next';
import React from 'react';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginPage/LoginForm';
import Nav from '../components/Nav';

const Loginpage: NextPage = () => {
  return (
    <div>
      <Nav />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Loginpage;
