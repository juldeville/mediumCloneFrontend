import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import PageNavBar from '../components/PageNavBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import bookmarks from '../reducers/bookmarks';
import article from '../reducers/article';

const store = configureStore({
  reducer: { bookmarks, article }
})


function App({ Component, pageProps }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(router.pathname)

  useEffect(() => {
    setCurrentPage(router.pathname);
  }, [router.pathname])
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      {currentPage === '/' ? <Header/> : <PageNavBar page={currentPage}/>}
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
