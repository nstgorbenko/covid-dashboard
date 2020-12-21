import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Parameter, parameterToTitle, PARAMETERS_LIST } from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getParameter } from '@/store/app/selector';
import { StateInterface } from '@/types/entities';
import { getNextArrayItem, getPreviousArrayItem } from '@/utils/common';

import styles from './Title.scss';

interface TitleProps {
  parameter: Parameter;
  changeParameter(parameter: Parameter): void;
}

const Title: React.FC<TitleProps> = (props: TitleProps) => {
  const { parameter, changeParameter } = props;

  return (
    <div className={styles['title']}>
      <p
        className={classNames(
          styles['title__arrow'],
          styles['title__arrow--left']
        )}
        onClick={() => (changeParameter(getPreviousArrayItem(PARAMETERS_LIST, parameter) as Parameter))}
      />
      <p className={styles['title__text']}>{parameterToTitle[parameter]}</p>
      <p
        className={classNames(
          styles['title__arrow'],
          styles['title__arrow--right']
        )}
        onClick={() => changeParameter(getNextArrayItem(PARAMETERS_LIST, parameter) as Parameter)}
      />
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  parameter: getParameter(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeParameter(parameter: Parameter) {
    dispatch(ActionCreator.changeParameter(parameter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
