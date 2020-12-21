import classNames from 'classnames';
import React from 'react';

import Resize from '@/components/Resize';
import Title from '@/components/Title';

import LeafletMap from '../LeafletMap';
import { Screen } from '@/constants/constants';

const Map: React.FC = () => {
  return (
    <div className={classNames(
      styles['map'],
      styles['grid__element']
    )}>
      <Resize isFullScreen={false} onClick={() => {}}/>
      <Title/>
      <LeafletMap/>
    </div>
  );
};

export default Map;
