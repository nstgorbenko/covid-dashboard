import classNames from 'classnames';
import { Screen } from '@/constants/constants';
import { CSSProperties } from 'react';

export const getNextArrayItem = <T>(array: Array<T>, currentItem: T): T => {
  const currentItemIndex = array.indexOf(currentItem);
  if (currentItemIndex === array.length - 1) {
    return array[0];
  }
  return array[currentItemIndex + 1];
};

export const getPreviousArrayItem = <T>(array: Array<T>, currentItem: T): T => {
  const currentItemIndex = array.indexOf(currentItem);
  if (currentItemIndex === 0) {
    return array[array.length - 1];
  }
  return array[currentItemIndex - 1];
};

export const getScreenComponentClass = (screenComponentName: Screen, isFullScreenComponent: boolean, fullScreenName: Screen, styles: CSSProperties) => {
  if (isFullScreenComponent) {
    return classNames(styles[screenComponentName], styles['grid__element'], styles['grid__element--show']);
  } else if (!isFullScreenComponent && fullScreenName !== Screen.ALL) {
    return classNames(styles[screenComponentName], styles['grid__element'], styles['grid__element--hide']);
  }
  return classNames(styles[screenComponentName], styles['grid__element']);
};
