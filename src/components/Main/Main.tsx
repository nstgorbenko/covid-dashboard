import React from 'react';
import styles from './Main.scss';
import classNames from 'classnames';
import Chart from '@/components/Chart';
import Map from '@/components/Map';
import Info from '@/components/Info';
import Table from '@/components/Table';
import List from '@/components/List';

const Main: React.FC = () => {
  return (
    <main className={styles['main']}>
      <div className={classNames(
        styles['main__wrapper'],
        styles['grid']
      )}>
        <List/>
        <Map/>
        <Info/>
        <Table/>
        <Chart/>
      </div>
    </main>
  );
};

export default Main;
