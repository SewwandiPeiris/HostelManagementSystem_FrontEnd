import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Tool from '../../Components/Tool';

const Home= () => {
  return (
    <>
      <SideBar />
      <Tool/>
    </>
  );
};

export default Home;