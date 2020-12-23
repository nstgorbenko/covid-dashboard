import classNames from 'classnames';
import React from 'react';

import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Screen } from '@/constants/constants';

import LeafletMap from '../LeafletMap';

import styles from './Map.scss';

const Map: React.FC = () => (
  <div className={classNames(
    styles['map'],
    styles['grid__element']
  )}
  >
    <Resize isFullScreen={false} onClick={() => { }} />
    <Title screen={Screen.MAP} />
    <LeafletMap />
  </div>
);

export default Map;
