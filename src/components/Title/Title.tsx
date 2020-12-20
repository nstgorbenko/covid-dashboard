import React from 'react';
import classNames from 'classnames';
import styles from './Title.scss';

const Title: React.FC = () => {
  return (
    <div className={styles['title']}>
      <p className={classNames(
        styles['title__arrow'],
        styles['title__arrow--left']
      )}></p>
      <p className={styles['title__text']}>Last day deaths per 100,000 population </p>
      <p className={classNames(
        styles['title__arrow'],
        styles['title__arrow--right']
      )}></p>
    </div>
  );
};

export default Title;
