import { Parameter, Screen } from '@/constants/constants';
import { AppStateInterface } from '@/types/entities';

interface ActionInterface {
  type: string;
  payload: string | Parameter | Screen;
}

const initialState: AppStateInterface = {
  country: '',
  parameter: Parameter.CONFIRMED,
  activeScreen: Screen.ALL,
};

const ActionType = {
  CHANGE_COUNTRY: 'CHANGE_COUNTRY',
  CHANGE_PARAMETER: 'CHANGE_PARAMETER',
  CHANGE_ACTIVE_SCREEN: 'CHANGE_ACTIVE_SCREEN',
};

const ActionCreator = {
  changeCountry: (country: string) => ({
    type: ActionType.CHANGE_COUNTRY,
    payload: country,
  }),
  changeParameter: (parameter: Parameter) => ({
    type: ActionType.CHANGE_PARAMETER,
    payload: parameter,
  }),
  changeActiveScreen: (screen: Screen) => ({
    type: ActionType.CHANGE_ACTIVE_SCREEN,
    payload: screen,
  })
};

const reducer = (state = initialState, action: ActionInterface) => {
  switch (action.type) {
    case ActionType.CHANGE_COUNTRY:
      return Object.assign({}, state, {
        country: action.payload,
      });
    case ActionType.CHANGE_PARAMETER:
      return Object.assign({}, state, {
        parameter: action.payload,
      });
    case ActionType.CHANGE_ACTIVE_SCREEN:
      return Object.assign({}, state, {
        activeScreen: action.payload,
      });
    default:
      return state;
  }
};

export {ActionCreator, ActionType, reducer};
