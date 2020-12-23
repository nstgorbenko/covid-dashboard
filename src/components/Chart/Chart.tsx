import React, { useState } from 'react';
import { Dispatch } from 'redux';
import {connect} from "react-redux";
import { Line } from 'react-chartjs-2';
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
import classNames from 'classnames';

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

  const data = {
    labels: shownData.dates,
    datasets:[
      {
        data: shownData.counts,
        backgroundColor: '#238636',
        pointBorderWidth: 1,
        pointBorderColor: '#238636',
        pointStyle: 'line',
      }
    ]
  };

  // <div className={classNames(
  //   styles['grid__element'],
  //   styles['chart'],
  //   styles['grid__element--show']
  //   )}>

  return (
    <div className={getScreenComponentClass(screenName, isFullScreen, fullScreen, styles)}>
      <Resize isFullScreen={isFullScreen} onClick={changeScreenView}/>
      <Title screen={screenName}/>
      <div className={styles['chart__wrapper']}>
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            tooltips: {
              intersect: false,
              titleFontColor: '#c9d1d9',
              backgroundColor: '#474f59',
              titleAlign: 'center',
              bodyFontColor: '#c9d1d9',
              displayColors: false,
            },
          }}
        />
      </div>
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
