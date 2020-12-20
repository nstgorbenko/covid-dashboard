import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Main from '@/components/Main';
import { CountryInfo } from '@/types/entities';

import styles from './Page.scss';

interface PageProps {
  countriesInfo: Array<CountryInfo>;
}

const Page: React.FC<PageProps> = (props: PageProps) => {
  const { countriesInfo } = props;

  return (
    <div className={styles['page']}>
      <Header />
      <Main countriesInfo={countriesInfo} />
      <Footer />
    </div>
  );
};

export default Page;
