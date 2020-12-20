import classNames from 'classnames';
import React from 'react';

import styles from './Info.scss';

const Info: React.FC = () => (
  <div className={classNames(
    styles['info'],
    styles['grid__element']
  )}
  >
    <p className={styles['info__text']}>Last updated at</p>
    <p className={styles['info__date']}>17/12/2020, 10:20</p>
  </div>
);

export default Info;
