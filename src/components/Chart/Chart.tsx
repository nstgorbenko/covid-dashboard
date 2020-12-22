import React from 'react';
import classNames from 'classnames';
import styles from './Chart.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Screen } from '@/constants/constants';

const Chart: React.FC = () => {
  return (
    <div className={classNames(
      styles['chart'],
      styles['grid__element']
    )}>
      <Resize isFullScreen={false} onClick={() => {}}/>
      <Title screen={Screen.CHART}/>
    </div>
  );
};

export default Chart;
