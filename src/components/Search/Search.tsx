import React from 'react';

import styles from './Search.scss';

const Search: React.FC = () => (
  <div className={styles['search']}>
    <input className={styles['search__bar']} type="text" placeholder="Search" />
    <span className={styles['search__reset']}>
      <svg className={styles['search__reset-icon']} width="36" height="36">
        <use xlinkHref="#icon-search-reset" />
      </svg>
    </span>
    <span className={styles['search__keyboard']}>
      <svg className={styles['search__keyboard-icon']}>
        <use xlinkHref="#icon-keyboard" />
      </svg>
    </span>
  </div>
);

export default Search;
