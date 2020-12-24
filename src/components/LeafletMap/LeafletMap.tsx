import { LatLngTuple } from 'leaflet';
import React from 'react';
import {
  MapContainer, TileLayer, GeoJSON, LayersControl,
} from 'react-leaflet';
import { GeoJsonObject } from 'geojson';

import geojson from '@/assets/data/geojson.json';
import styles from '@/components/LeafletMap/LeafletMap.scss';
import { Parameter, Screen } from '@/constants/constants';
import { CountryDataInterface, ShownCountryInterface } from '@/types/entities';
import getShownCountriesData from '@/utils/countries-data';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom = 2;
const mapStyle = {
  weight: 1,
  color: 'gray',
  fillOpacity: 1,
};

interface LeafletMapProps {
  screen: Screen;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  onCountryClick(country: string): void;
}

const LeafletMap: React.FC<LeafletMapProps> = (props: LeafletMapProps) => {
  const { screen, parameter, countriesData, onCountryClick } = props;
  const shownCountriesData = getShownCountriesData(countriesData, parameter);

  const getMaxCount = (data: Array<ShownCountryInterface>): ShownCountryInterface => {
    return data.reduce((previous, current) => (current.count > previous.count ? current : previous));
  };

  const getCountryColor = (data: number): string => {
    const maxCount = getMaxCount(shownCountriesData);
    const currentCount: number = (data * 100) / maxCount.count;

    let color: string;
    if (currentCount > 50) {
      color = '#1b421f';
    } else if (currentCount > 10) {
      color = '#1f5827';
    } else if (currentCount > 1) {
      color = '#226f2e';
    } else if (currentCount > 0.5) {
      color = '#238636';
    } else if (currentCount > 0.4) {
      color = '#509a56';
    } else if (currentCount > 0.3) {
      color = '#75ae76';
    } else if (currentCount > 0.2) {
      color = '#97c297';
    } else if (currentCount > 0.1) {
      color = '#bad6b9';
    } else {
      color = '#dcebdb';
    }
    return color;
  };

  const getCountryCount = (data: Array<ShownCountryInterface>, iso3: string): number => {
    const countryData = data.find(({ countryInfo }) => countryInfo.iso3 === iso3);
    return countryData ? countryData.count : 0;
  };

  const getCountryNameByISO = (data: Array<ShownCountryInterface>, iso3: string): string => {
    const countryData = data.find(({ countryInfo }) => countryInfo.iso3 === iso3);
    return countryData ? countryData.country : '';
  };

  const onEachCountry = (area: any, layer: any): void => {
    const countryID: string = area.properties.ISO_A3;
    const countryName = getCountryNameByISO(shownCountriesData, countryID)
    const count = getCountryCount(shownCountriesData, countryID);

    layer.options.fillColor = getCountryColor(count);
    layer.bindTooltip(`${countryName} ${count.toLocaleString() || 'no value'}`, { closeButton: false, sticky: true });
    layer.on('click', () => onCountryClick(countryName));
  };

  return (
    <MapContainer id="mapId" className={styles['leaflet-map']} center={defaultLatLng} zoom={zoom}>
      <LayersControl>
        <LayersControl.BaseLayer name="Black And White">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="'https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png"
            noWrap
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <GeoJSON
        key={parameter}
        data={geojson as GeoJsonObject}
        style={mapStyle}
        onEachFeature={onEachCountry}
      />
    </MapContainer>
  );
};

export default LeafletMap;
