import React from 'react';
import classNames from 'classnames';
import styles from './Map.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import LeafletMap from '../LeafletMap';

const Map: React.FC = () => {
  return (
    <div className={classNames(
      styles['map'],
      styles['grid__element']
    )}>
      <Resize/>
      <Title/>
      <LeafletMap/>
    </div>
  );
};

export default Map;
