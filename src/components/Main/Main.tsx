import React from 'react';
import styles from './Main.scss';
import classNames from 'classnames';
import Chart from '@/components/Chart';
import Map from '@/components/Map';
import Info from '@/components/Info';
import Table from '@/components/Table';
import List from '@/components/List';
import { CountryInfo } from '@/types/entities';

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
      )}>
        <List countriesInfo={countriesInfo}/>
        <Map/>
        <Info/>
        <Table/>
        <Chart/>
      </div>
    </main>
  );
};

export default Main;
