import { Parameter } from '@/constants/constants';
import { CountryDataInterface, ShownCountryInterface } from '@/types/entities';

enum DataCount {
  TOTAL = 'total',
  PER_100 = 'per-100'
}

const getData = (countriesData: Array<CountryDataInterface>, parameter: string, count: DataCount = DataCount.TOTAL) => {
  const getCount = (countryData: CountryDataInterface, parameter: string) => {
    if (count === DataCount.PER_100) {
      return Math.trunc(countryData[parameter] / countryData.population * 100000);
    }
    return countryData[parameter];
  };

  return [...countriesData].map((countryData) => ({
    country: countryData.country,
    countryInfo: countryData.countryInfo,
    count: getCount(countryData, parameter),
  }))
  .sort((a, b) => b.count - a.count);
};

export const getShownCountriesData = (countriesData: Array<CountryDataInterface>, parameter: Parameter): Array<ShownCountryInterface> => {
  switch (parameter) {
    case Parameter.CONFIRMED:
      return getData(countriesData, 'cases');
    case Parameter.DEATHS:
      return getData(countriesData, 'deaths');
    case Parameter.RECOVERED:
      return getData(countriesData, 'recovered');
    case Parameter.DAY_CONFIRMED:
      return getData(countriesData, 'todayCases');
    case Parameter.DAY_DEATHS:
      return getData(countriesData, 'todayDeaths');
    case Parameter.DAY_RECOVERED:
      return getData(countriesData, 'todayRecovered');
    case Parameter.CONFIRMED_PER_100:
      return getData(countriesData, 'cases', DataCount.PER_100);
    case Parameter.DEATHS_PER_100:
      return getData(countriesData, 'deaths', DataCount.PER_100);
    case Parameter.RECOVERED_PER_100:
      return getData(countriesData, 'recovered', DataCount.PER_100);
    case Parameter.DAY_CONFIRMED_PER_100:
      return getData(countriesData, 'todayCases', DataCount.PER_100);
    case Parameter.DAY_DEATHS_PER_100:
      return getData(countriesData, 'todayDeaths', DataCount.PER_100);
    case Parameter.DAY_RECOVERED_PER_100:
      return getData(countriesData, 'todayRecovered', DataCount.PER_100);
  }
};
