import { LatLngTuple } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import styles from '@/components/LeafletMap/LeafletMap.scss';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom = 8;

const LeafletMap: React.FC = () => (
  <MapContainer id="mapId" className={styles['leaflet-map']} center={defaultLatLng} zoom={zoom}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
  </MapContainer>
);

export default LeafletMap;
