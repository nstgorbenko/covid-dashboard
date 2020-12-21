import classNames from 'classnames';
import React from 'react';

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
      <Title/>
    </div>
  );
};

export default Chart;
