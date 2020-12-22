import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import styles from './Table.scss';
import TableRow from '@/components/TableRow';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import { Parameter } from '@/constants/constants';
import { getGlobalData, getCountriesData } from '@/store/data/selector';
import { getCountry, getParameter } from '@/store/app/selector';
import { CountryDataInterface, StateInterface, GlobalDataInterface } from '@/types/entities';
import getShownTableData from '@/utils/table-data';
import { Screen } from '@/constants/constants';

interface TableProps {
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  globalData: GlobalDataInterface;
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { country, parameter, countriesData, globalData } = props;
  const shownData = getShownTableData(globalData, countriesData, country, parameter);

  return (
    <div className={classNames(
      styles['table'],
      styles['grid__element']
    )}>
      <Resize isFullScreen={false} onClick={() => {}}/>
      <Title screen={Screen.TABLE}/>
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
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
  globalData: getGlobalData(state),
});

export default connect(mapStateToProps)(Table);
