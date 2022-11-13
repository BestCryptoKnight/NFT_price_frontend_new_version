import React from "react";
import "../components/assets/animated.css";
import 'font-awesome/css/font-awesome.min.css';
// import 'elegant-icons/style.css';
// import 'et-line/style.css';

// Page SCSS
import '../components/assets/style.scss';
import '../components/assets/header.scss';
import '../components/assets/footer.scss';
import '../components/assets/home.scss';

import '../components/assets/nfttable.scss';

import '../components/assets/about.scss';

// Page SCSS


import '../components/assets/bootstrap.css';
import '../components/assets/responsive.css';
// import '../components/assets/style_grey.scss';
//redux store
import { Provider, useSelector } from 'react-redux'
import store from '../components/store';
//Layout
import Layout from "../components/Layout/Layout";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}