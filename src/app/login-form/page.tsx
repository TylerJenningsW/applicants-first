
"use client";

import React from 'react';
import LoginForm from './LoginForm';
import Header from '../components/Header'; // Correctly import the Header component

const LoginPage: React.FC = () => {
  return(
    <>
        <Header/>
        <LoginForm />
    </>

  );
};

export default LoginPage;
