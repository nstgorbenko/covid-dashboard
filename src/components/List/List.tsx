import classNames from 'classnames';
import React from 'react';

import ListItem from '@/components/ListItem';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { CountryInfo } from '@/types/entities';

import styles from './List.scss';

interface ListProps {
  countriesInfo: Array<CountryInfo>;
}

const List: React.FC<ListProps> = (props: ListProps) => {
  const { countriesInfo } = props;

  return (
    <div className={classNames(
      styles['list'],
      styles['grid__element']
    )}
    >
      <Resize />
      <Title />
      <ul className={styles['list__items']}>
        {countriesInfo.map(countryInfo => <ListItem key={countryInfo.name} countryInfo={countryInfo} />)}
      </ul>
    </div>
  );
};

export default List;
