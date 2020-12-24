import { StateInterface } from '@/types/entities';

export const getGlobalData = (state: StateInterface) => state['DATA'].globalData;
export const getCountriesData = (state: StateInterface) => state['DATA'].countriesData;
export const getGlobalHistoricalData = (state: StateInterface) => state['DATA'].globalHistoricalData;
export const getCountryHistoricalData = (state: StateInterface) => state['DATA'].countryHistoricalData;
