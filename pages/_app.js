import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import bookmarks from '../reducers/bookmarks';
import article from '../reducers/article';

const store = configureStore({
  reducer: { bookmarks, article }
})


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Header/>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
