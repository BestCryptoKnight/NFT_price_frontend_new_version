import React from 'react'
import Header from '../menu/header'
import Footer from '../menu/footer'
import ScrollToTop from '../menu/ScrollToTop'
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;
const Layout = ({ children }) => {

  return (
    <div className='wraper'>
      <div id='routerhang'>
        <GlobalStyles />
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}

export default Layout