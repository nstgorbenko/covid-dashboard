import React from 'react';
import styles from './Page.scss';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Footer from '@/components/Footer';

const Page: React.FC = () => {
  return (
    <div className={styles['page']}>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
};

export default Page;
