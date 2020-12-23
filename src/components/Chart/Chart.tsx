import React, { useState } from 'react';
import { Dispatch } from 'redux';
import {connect} from "react-redux";
import styles from './Chart.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Parameter, Screen } from '@/constants/constants';
import { StateInterface, HistoricalDataInterface, CountryDataInterface, GlobalDataInterface } from '@/types/entities';
import { getGlobalHistoricalData, getCountryHistoricalData, getCountriesData, getGlobalData } from '@/store/data/selector';
import { getActiveScreen, getCountry, getParameter } from '@/store/app/selector';
import { ActionCreator } from '@/store/app/app';
import getShownChartData from '@/utils/chart-data';
import { getScreenComponentClass } from '@/utils/common';
import ChartLine from '../ChartLine';

interface ChartProps {
  fullScreen: Screen;
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  globalData: GlobalDataInterface;
  globalHistoricalData: HistoricalDataInterface;
  countryHistoricalData: HistoricalDataInterface;
  changeActiveScreen(screen: Screen): void;
}

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
  const { fullScreen, country, parameter, countriesData, globalData, globalHistoricalData, countryHistoricalData, changeActiveScreen } = props;

  const { population } = !country ? globalData : countriesData.find((countryData) => countryData.country === country) as CountryDataInterface;
  const historicalData = !country ? globalHistoricalData : countryHistoricalData;
  const shownData = getShownChartData(historicalData, population, parameter);

  const screenName = Screen.CHART;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeScreenView = () => {
    isFullScreen ? changeActiveScreen(Screen.ALL) : changeActiveScreen(screenName);
    setIsFullScreen(prev => !prev);
  };

  return (
    <div className={getScreenComponentClass(screenName, isFullScreen, fullScreen, styles)}>
      <Resize isFullScreen={isFullScreen} onClick={changeScreenView}/>
      <Title screen={screenName}/>
      <ChartLine values={shownData}/>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  fullScreen: getActiveScreen(state),
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
  globalData: getGlobalData(state),
  globalHistoricalData: getGlobalHistoricalData(state),
  countryHistoricalData: getCountryHistoricalData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeActiveScreen(screen: Screen) {
    dispatch(ActionCreator.changeActiveScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
