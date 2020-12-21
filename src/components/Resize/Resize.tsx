import classNames from 'classnames';
import React from 'react';

import styles from './Resize.scss';

interface ResizeProps {
  isFullScreen: boolean;
  onClick(): void;
}

const Resize: React.FC<ResizeProps> = (props: ResizeProps) => {
  const { isFullScreen, onClick } = props;

  const resizeClass = isFullScreen
    ? classNames(styles['resize'], styles['resize--collapse'])
    : classNames(styles['resize'], styles['resize--expand']);

  return (
    <div
      className={resizeClass}
      onClick={onClick}
    >
      <svg className={styles['resize__icon']}>
        <use className={styles['resize__icon--expand']} xlinkHref="#icon-expand"></use>
        <use className={styles['resize__icon--collapse']} xlinkHref="#icon-collapse"></use>
      </svg>
    </div>
  );
};

export default Resize;
