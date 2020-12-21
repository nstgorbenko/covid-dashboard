import React from 'react';
import classNames from 'classnames';
import styles from './ListItem.scss';
import { ShownCountryInterface } from '@/types/entities';

interface ListItemProps {
  countryData: ShownCountryInterface,
  activeCountry: string,
  onCountryClick(country: string): void,
}

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const { countryData: { country, countryInfo, count }, activeCountry, onCountryClick } = props;
  const { flag } = countryInfo;

  const isActiveCountry = country === activeCountry;

  return (
    <li
      className={isActiveCountry
        ? classNames(styles['list__item'], styles['list__item--active'])
        : styles['list__item']}
      onClick={() => onCountryClick(country)}>
      <span className={styles['list__item-count']}>{count.toLocaleString()}</span>
      <span className={styles['list__item-country']}>
        <img className={styles['list__item-flag']} src={flag} alt={`${country} flag`}/>
        <span className="list__item-name">{country}</span>
      </span>
    </li>
  );
};

export default ListItem;
