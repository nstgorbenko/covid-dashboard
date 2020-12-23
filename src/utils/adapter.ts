import { ServerGlobalInterface, ServerCountryInterface } from '@/types/entities';

const EXCLUDED_COUNTRIES = ['Diamond Princess', 'MS Zaandam'];

export const adaptGlobalData = (data: ServerGlobalInterface) => ({
  updated: data.updated,
  cases: data.cases,
  todayCases: data.todayCases,
  deaths: data.deaths,
  todayDeaths: data.todayDeaths,
  recovered: data.recovered,
  todayRecovered: data.todayRecovered,
  population: data.population,
});

const adaptCountryData = (data: ServerCountryInterface) => ({
  updated: data.updated,
  cases: data.cases,
  todayCases: data.todayCases,
  deaths: data.deaths,
  todayDeaths: data.todayDeaths,
  recovered: data.recovered,
  todayRecovered: data.todayRecovered,
  population: data.population,
  country: data.country,
  countryInfo: {
    lat: data.countryInfo.lat,
    long: data.countryInfo.long,
    flag: data.countryInfo.flag,
    iso3: data.countryInfo.iso3,
  },
});

export const adaptCountriesData = (data: Array<ServerCountryInterface>) => data
  .map(countryData => adaptCountryData(countryData))
  .filter(({ country }) => EXCLUDED_COUNTRIES.indexOf(country) === -1);
