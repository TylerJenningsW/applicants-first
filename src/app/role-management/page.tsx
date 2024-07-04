"use client"; // Add this directive if using Next.js


import React from 'react';
import RoleManagement from './RoleManagement';
import Header from '../components/Header';

const RoleManagementPage: React.FC = () => {
  return(
    <>
      <Header/>
     <RoleManagement />;
    </>
  );
  
 
};

export default RoleManagementPage;
