import React from 'react';
import classNames from 'classnames';
import styles from './List.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import ListItem from '@/components/ListItem';
import {connect} from "react-redux";
import { getActiveScreen, getCountry, getParameter } from '@/store/app/selector';
import { ActionCreator } from '@/store/app/app';
import { Parameter, Screen } from '@/constants/constants';
import { CountryDataInterface, StateInterface } from '@/types/entities';
import { Dispatch } from 'redux';
import { getCountriesData } from '@/store/data/selector';
import { getShownCountriesData } from '@/utils/countries-data';

interface ListProps {
  country: string;
  parameter: Parameter;
  activeScreen: Screen; // добавлять класс элементу и кнопке ресайза или нет
  countriesData: Array<CountryDataInterface>;
  changeCountry(country: string): void;
  changeActiveScreen(screen: Screen): void; // по щелчку на кнопку ресайза срабатывает смена или закрывается текущий - сложная логика тоже
}

const List: React.FC<ListProps> = (props: ListProps) => {
  const { country, parameter, activeScreen, countriesData, changeCountry, changeActiveScreen } = props;

  const shownCountriesData = getShownCountriesData(countriesData, parameter);

  return (
    <div className={classNames(
      styles['list'],
      styles['grid__element']
    )}>
      <Resize/>
      <Title/>
      <ul className={styles['list__items']}>
        {shownCountriesData.map((countryData) =>
          <ListItem
            key={countryData.country}
            countryData={countryData}
            activeCountry={country}
            onCountryClick={changeCountry}
          />
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
   country: getCountry(state),
   parameter: getParameter(state),
   activeScreen: getActiveScreen(state),
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
