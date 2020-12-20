import React from 'react';
import classNames from 'classnames';
import styles from './Resize.scss';

const Resize: React.FC = () => {
  return (
    <div className={classNames(
      styles['resize'],
      styles['resize--collapse']
    )}>
      <svg className={styles['resize__icon']}>
        <use className={styles['resize__icon--expand']} xlinkHref="#icon-expand"></use>
        <use className={styles['resize__icon--collapse']} xlinkHref="#icon-collapse"></use>
      </svg>
    </div>
  );
};

export default Resize;
