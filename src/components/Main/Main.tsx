import classNames from 'classnames';
import React from 'react';

import Chart from '@/components/Chart';
import Info from '@/components/Info';
import List from '@/components/List';
import Map from '@/components/Map';
import Table from '@/components/Table';
import { CountryInfo } from '@/types/entities';

import styles from './Main.scss';

interface MainProps {
  countriesInfo: Array<CountryInfo>;
}

const Main: React.FC<MainProps> = (props: MainProps) => {
  const { countriesInfo } = props;

  return (
    <main className={styles['main']}>
      <div className={classNames(
        styles['main__wrapper'],
        styles['grid']
      )}
      >
        <List countriesInfo={countriesInfo} />
        <Map />
        <Info />
        <Table />
        <Chart />
      </div>
    </main>
  );
};

export default Main;
