import classNames from 'classnames';
import React from 'react';

import styles from './Resize.scss';

const Resize: React.FC = () => (
  <div className={classNames(
    styles['resize'],
    styles['resize--collapse']
  )}
  >
    <svg className={styles['resize__icon']}>
      <use className={styles['resize__icon--expand']} xlinkHref="#icon-expand" />
      <use className={styles['resize__icon--collapse']} xlinkHref="#icon-collapse" />
    </svg>
  </div>
);

export default Resize;
