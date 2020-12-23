import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ListItem from '@/components/ListItem';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Parameter, Screen } from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getCountry, getParameter, getActiveScreen } from '@/store/app/selector';
import { getCountriesData } from '@/store/data/selector';
import { CountryDataInterface, StateInterface } from '@/types/entities';
import { getScreenComponentClass } from '@/utils/common';
import getShownCountriesData from '@/utils/countries-data';

import styles from './List.scss';

interface ListProps {
  fullScreen: Screen;
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  changeCountry(country: string): void;
  changeActiveScreen(screen: Screen): void;
}

const List: React.FC<ListProps> = (props: ListProps) => {
  const {
    fullScreen, country, parameter, countriesData, changeCountry, changeActiveScreen,
  } = props;
  const shownCountriesData = getShownCountriesData(countriesData, parameter);
  const screenName = Screen.LIST;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeScreenView = () => {
    isFullScreen ? changeActiveScreen(Screen.ALL) : changeActiveScreen(screenName);
    setIsFullScreen(prev => !prev);
  };

  return (
    <div className={getScreenComponentClass(screenName, isFullScreen, fullScreen, styles)}>
      <Resize isFullScreen={isFullScreen} onClick={changeScreenView} />
      <Title screen={screenName} />
      <ul className={styles['list__items']}>
        {shownCountriesData.map(countryData => (
          <ListItem
            key={countryData.country}
            countryData={countryData}
            activeCountry={country}
            onCountryClick={changeCountry}
          />
        ))}
      </ul>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
