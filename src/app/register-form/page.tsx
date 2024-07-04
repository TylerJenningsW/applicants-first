"use client";

import React from 'react';
import RegisterForm from './RegisterForm';
import Header from '../components/Header';
import { headers } from 'next/headers';
import Head from 'next/head';

const RegisterPage: React.FC = () => {
  return(
    <>
       <Header/>
       <RegisterForm />
    </> 
 
);
};

export default RegisterPage;
