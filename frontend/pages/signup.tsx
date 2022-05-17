import React from 'react';
import { NextPage } from 'next';
import SignUpForm from '../components/SignUpPage/SignUpForm';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
const SignUp: NextPage = () => {
  return (
    <div>
      <Nav />
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default SignUp;
