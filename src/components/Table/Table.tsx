import React, { useState } from 'react';
import { Dispatch } from 'redux';
import {connect} from "react-redux";
import styles from './Table.scss';
import TableRow from '@/components/TableRow';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Parameter } from '@/constants/constants';
import { getGlobalData, getCountriesData } from '@/store/data/selector';
import { getActiveScreen, getCountry, getParameter } from '@/store/app/selector';
import { CountryDataInterface, StateInterface, GlobalDataInterface } from '@/types/entities';
import getShownTableData from '@/utils/table-data';
import { Screen } from '@/constants/constants';
import { getScreenComponentClass } from '@/utils/common';
import { ActionCreator } from '@/store/app/app';

interface TableProps {
  fullScreen: Screen;
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  globalData: GlobalDataInterface;
  changeActiveScreen(screen: Screen): void;
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { fullScreen, country, parameter, countriesData, globalData, changeActiveScreen } = props;
  const shownData = getShownTableData(globalData, countriesData, country, parameter);
  const screenName = Screen.TABLE;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeScreenView = () => {
    isFullScreen ? changeActiveScreen(Screen.ALL) : changeActiveScreen(screenName);
    setIsFullScreen(prev => !prev);
  };

  return (
    <div className={getScreenComponentClass(screenName, isFullScreen, fullScreen, styles)}>
      <Resize isFullScreen={isFullScreen} onClick={changeScreenView}/>
      <Title screen={screenName}/>
      <table className={styles['table__content']}>
        <tbody>
          {shownData.map((data) =>
            <TableRow
              key={data.name}
              data={data}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  fullScreen: getActiveScreen(state),
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
  globalData: getGlobalData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeActiveScreen(screen: Screen) {
    dispatch(ActionCreator.changeActiveScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
