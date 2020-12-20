import classNames from 'classnames';
import React from 'react';

import Resize from '@/components/Resize';
import Title from '@/components/Title';

import styles from './Chart.scss';

const Chart: React.FC = () => (
  <div className={classNames(
    styles['chart'],
    styles['grid__element']
  )}
  >
    <Resize />
    <Title />
  </div>
);

export default Chart;
