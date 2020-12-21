import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import styles from './Title.scss';
import { StateInterface } from '@/types/entities';
import { getParameter } from '@/store/app/selector';
import { Dispatch } from 'redux';
import { Parameter, parameterToTitle, PARAMETERS_LIST } from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getNextArrayItem, getPreviousArrayItem } from '@/utils/common';

interface TitleProps {
  parameter: Parameter;
  changeParameter(parameter: Parameter): void;
}

const Title: React.FC<TitleProps> = (props: TitleProps) => {
  const { parameter, changeParameter } = props;

  return (
    <div className={styles['title']}>
      <p className={classNames(
        styles['title__arrow'],
        styles['title__arrow--left']
      )}
      onClick={() => (changeParameter(getPreviousArrayItem(PARAMETERS_LIST, parameter) as Parameter))}>
      </p>
      <p className={styles['title__text']}>{parameterToTitle[parameter]}</p>
      <p className={classNames(
        styles['title__arrow'],
        styles['title__arrow--right']
      )}
      onClick={() => changeParameter(getNextArrayItem(PARAMETERS_LIST, parameter) as Parameter)}></p>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  parameter: getParameter(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
 changeParameter(parameter: Parameter) {
   dispatch(ActionCreator.changeParameter(parameter));
 }
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
