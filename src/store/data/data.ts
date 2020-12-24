import { adaptGlobalData, adaptCountriesData, adaptCountryHistoricalData } from '@/utils/adapter';
import { GlobalDataInterface, HistoricalDataInterface, CountryDataInterface, DataStateInterface, StateInterface } from '@/types/entities';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';

interface ActionInterface {
  type: string;
  payload: GlobalDataInterface | Array<CountryDataInterface> | HistoricalDataInterface | {};
}

const initialState: DataStateInterface = {
  globalData: {},
  countriesData: [],
  globalHistoricalData: {},
  countryHistoricalData: {},
};

const ActionType = {
  LOAD_GLOBAL_DATA: 'LOAD_GLOBAL_DATA',
  LOAD_COUNTRIES_DATA: 'LOAD_COUNTRIES_DATA',
  LOAD_GLOBAL_HISTORICAL_DATA: 'LOAD_GLOBAL_HISTORICAL_DATA',
  LOAD_COUNTRY_HISTORICAL_DATA: 'LOAD_COUNTRY_HISTORICAL_DATA',
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
  loadGlobalHistoricalData: (globalHistoricalData: HistoricalDataInterface) => ({
    type: ActionType.LOAD_GLOBAL_HISTORICAL_DATA,
    payload: globalHistoricalData,
  }),
  loadCountryHistoricalData: (countryHistoricalData: HistoricalDataInterface | {}) => ({
    type: ActionType.LOAD_COUNTRY_HISTORICAL_DATA,
    payload: countryHistoricalData,
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
  loadGlobalHistoricalData: (): ThunkAction<Promise<void>, StateInterface, AxiosInstance, ActionInterface> => (dispatch, getState, api) => {
    return api.get('/historical/all?lastdays=all')
      .then(({ data }) => {
        dispatch(ActionCreator.loadGlobalHistoricalData(data));
      });
  },
  loadCountryHistoricalData: (country: string): ThunkAction<Promise<void> | any, StateInterface, AxiosInstance, ActionInterface> => (dispatch, getState, api) => {
    if (country) {
      return api.get(`/historical/${country}?lastdays=all`)
      .then(({ data }) => {
        const adaptedCountryHistoricalData = adaptCountryHistoricalData(data);
        dispatch(ActionCreator.loadCountryHistoricalData(adaptedCountryHistoricalData));
      });
    } else {
      return Promise.resolve(() => dispatch(ActionCreator.loadCountryHistoricalData({})));
    }
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
    case ActionType.LOAD_GLOBAL_HISTORICAL_DATA:
      return Object.assign({}, state, {
        globalHistoricalData: action.payload,
      });
    case ActionType.LOAD_COUNTRY_HISTORICAL_DATA:
      return Object.assign({}, state, {
        countryHistoricalData: action.payload,
      });
    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation, reducer};
