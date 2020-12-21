import classNames from 'classnames';
import React from 'react';

import Chart from '@/components/Chart';
import Info from '@/components/Info';
import List from '@/components/List';

const Main: React.FC = () => {
  return (
    <main className={styles['main']}>
      <div className={classNames(
        styles['main__wrapper'],
        styles['grid']
<<<<<<< HEAD
      )}
      >
        <List countriesInfo={countriesInfo} />
        <Map />
        <Info />
        <Table />
        <Chart />
=======
      )}>
        <List/>
        <Map/>
        <Info/>
        <Table/>
        <Chart/>
>>>>>>> 23ede6a42c7b3b8be858ebe5f9ab8ffd6fdafece
      </div>
    </main>
  );
};

export default Main;
