import { adaptGlobalData, adaptCountriesData } from '@/utils/adapter';
import { GlobalDataInterface, CountryDataInterface, DataStateInterface, StateInterface } from '@/types/entities';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';

interface ActionInterface {
  type: string;
  payload: GlobalDataInterface | Array<CountryDataInterface>;
}

const initialState: DataStateInterface = {
  globalData: [],
  countriesData: [],
};

const ActionType = {
  LOAD_GLOBAL_DATA: 'LOAD_GLOBAL_DATA',
  LOAD_COUNTRIES_DATA: 'LOAD_COUNTRIES_DATA',
};

const ActionCreator = {
  loadGlobalData: (globalData: GlobalDataInterface) => ({
    type: ActionType.LOAD_GLOBAL_DATA,
    payload: globalData,
  }),
  loadCountriesData: (countriesData: Array<CountryDataInterface>) => ({
    type: ActionType.LOAD_COUNTRIES_DATA,
    payload: countriesData,
  }),
};

const Operation = {
  loadGlobalData: (): ThunkAction<Promise<void>, StateInterface, AxiosInstance, ActionInterface> => (dispatch, getState, api) => {
    return api.get('/all')
      .then(({ data }) => {
        const adaptedGlobalData = adaptGlobalData(data);
        dispatch(ActionCreator.loadGlobalData(adaptedGlobalData));
      });
  },
  loadCountriesData: (): ThunkAction<Promise<void>, StateInterface, AxiosInstance, ActionInterface> => (dispatch, getState, api) => {
    return api.get('/countries')
      .then(({ data }) => {
        const adaptedCountriesData = adaptCountriesData(data);
        dispatch(ActionCreator.loadCountriesData(adaptedCountriesData));
      });
  },
};

const reducer = (state = initialState, action: ActionInterface) => {
  switch (action.type) {
    case ActionType.LOAD_GLOBAL_DATA:
      return Object.assign({}, state, {
        globalData: action.payload,
      });
    case ActionType.LOAD_COUNTRIES_DATA:
      return Object.assign({}, state, {
        countriesData: action.payload,
      });
    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation, reducer};
