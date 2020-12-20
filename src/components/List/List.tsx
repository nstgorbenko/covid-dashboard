import React from 'react';
import classNames from 'classnames';
import styles from './List.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import ListItem from '@/components/ListItem';
import { CountryInfo } from '@/types/entities';

interface ListProps {
  countriesInfo: Array<CountryInfo>;
}

const List: React.FC<ListProps> = (props: ListProps) => {
  const { countriesInfo } = props;

  return (
    <div className={classNames(
      styles['list'],
      styles['grid__element']
    )}>
      <Resize/>
      <Title/>
      <ul className={styles['list__items']}>
        {countriesInfo.map((countryInfo) =>
          <ListItem key={countryInfo.name} countryInfo={countryInfo}/>
        )}
      </ul>
    </div>
  );
};

export default List;
