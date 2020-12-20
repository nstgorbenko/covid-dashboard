import React from 'react';
import styles from './ListItem.scss';
import { CountryInfo } from '@/types/entities';

interface ListItemProps {
  countryInfo: CountryInfo;
}

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const { countryInfo } = props;
  const { name, id, count } = countryInfo;

  return (
    <li className={styles['list__item']}>
      <span className={styles['list__item-count']}>{count}</span>
      <span className={styles['list__item-country']}>
        <img className={styles['list__item-flag']} src={`https://www.countryflags.io/${id}/flat/24.png`} alt={`${name} flag`}/>
        <span className="list__item-name">{name}</span>
      </span>
    </li>
  );
};

export default ListItem;
