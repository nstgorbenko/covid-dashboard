import { LatLngTuple } from 'leaflet';
import React from 'react';
import {
  MapContainer, TileLayer, GeoJSON, LayersControl,
} from 'react-leaflet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import geojson from '@/assets/data/geojson';
import styles from '@/components/LeafletMap/LeafletMap.scss';
import { Parameter, Screen } from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getCountry, getParameter, getActiveScreen } from '@/store/app/selector';
import { getCountriesData } from '@/store/data/selector';
import { CountryDataInterface, StateInterface } from '@/types/entities';
import { getShownCountriesData } from '@/utils/countries-data';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom = 2;
interface LeafletMapProps {
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
}

const LeafletMap: React.FC<LeafletMapProps> = (props: LeafletMapProps) => {
  const { parameter, countriesData } = props;
  const shownCountriesData = getShownCountriesData(countriesData, parameter);

  const mapStyle = {
    fillColor: 'red',
    weight: 1,
    color: 'gray',
    fillOpacity: 0.8,
  };

  const getMaxCount = (data: any): object => {
    const max: object = data.reduce((prev: object, cur: object): object => {
      return cur.count > prev.count ? cur : prev;
    });
    return max;
  };

  const getColor = (data: number): string => {
    const maxCount: object = getMaxCount(shownCountriesData);
    const currentCount: number = (data * 100) / maxCount.count;
    let color: string;
    if (currentCount > 50) {
      color = '#000000';
    } else if (currentCount > 10) {
      color = '#252525';
    } else if (currentCount > 1) {
      color = '#525252';
    } else if (currentCount > 0.5) {
      color = '#737373';
    } else if (currentCount > 0.4) {
      color = '#969696';
    } else if (currentCount > 0.3) {
      color = '#bdbdbd';
    } else if (currentCount > 0.2) {
      color = '#d9d9d9';
    } else if (currentCount > 0.1) {
      color = '#f0f0f0';
    } else {
      color = '#ffffff';
    }
    return color;
  };

  const selectCountry = (data: object, country: string): number => {
    for (const item in data) {
      if (data[item].countryInfo.iso3 === country) {
        return data[item].count;
      }
    }
  };

  const onEachCountry = (area: any, layer: any) => {
    const country: string = area.properties.ADMIN;
    const count: number = selectCountry(shownCountriesData, area.properties.ISO_A3) || 0;
    layer.options.fillColor = getColor(count);
    layer.bindTooltip(`${country} ${count.toLocaleString() || 'no value'}`, { closeButton: false, sticky: true });
  };

  return (
    <MapContainer id="mapId" className={styles['leaflet-map']} center={defaultLatLng} zoom={zoom}>
      <LayersControl>
        <LayersControl.BaseLayer checked name="Default">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            noWrap={true}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Black And White">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="'https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png"
            noWrap={true}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <GeoJSON
        data={geojson}
        style={mapStyle}
        onEachFeature={onEachCountry}
      />
    </MapContainer>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  fullScreen: getActiveScreen(state),
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeCountry(country: string) {
    dispatch(ActionCreator.changeCountry(country));
  },
  changeActiveScreen(screen: Screen) {
    dispatch(ActionCreator.changeActiveScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMap);
