import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import { Line } from 'react-chartjs-2';
import styles from './Chart.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Parameter, Screen } from '@/constants/constants';
import { StateInterface, HistoricalDataInterface, CountryDataInterface, GlobalDataInterface } from '@/types/entities';
import { getGlobalHistoricalData, getCountryHistoricalData, getCountriesData, getGlobalData } from '@/store/data/selector';
import { getCountry, getParameter } from '@/store/app/selector';
import getShownChartData from '@/utils/chart-data';

interface ChartProps {
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  globalData: GlobalDataInterface;
  globalHistoricalData: HistoricalDataInterface;
  countryHistoricalData: HistoricalDataInterface;
}

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
  const { country, parameter, countriesData, globalData, globalHistoricalData, countryHistoricalData } = props;
  const { population } = !country ? globalData : countriesData.find((countryData) => countryData.country === country) as CountryDataInterface;
  const historicalData = !country ? globalHistoricalData : countryHistoricalData;
  const shownData = getShownChartData(historicalData, population, parameter);

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

  return (
    <div className={classNames(
      styles['chart'],
      styles['grid__element']
    )}>
      <Resize isFullScreen={false} onClick={() => {}}/>
      <Title screen={Screen.CHART}/>
      <div className={styles['chart__wrapper']}>
        <Line
          data={data}
          options={{
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
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
  globalData: getGlobalData(state),
  globalHistoricalData: getGlobalHistoricalData(state),
  countryHistoricalData: getCountryHistoricalData(state),
});

export default connect(mapStateToProps)(Chart);
