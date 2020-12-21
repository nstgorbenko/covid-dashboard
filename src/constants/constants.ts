export enum Parameter {
  CONFIRMED = 'confirmed',
  DEATHS = 'deaths',
  RECOVERED = 'recovered',
  CONFIRMED_PER_100 = 'confirmed-per-100',
  DEATHS_PER_100 = 'deaths-per-100',
  RECOVERED_PER_100 = 'recovered-per-100',
  DAY_CONFIRMED = 'day-confirmed',
  DAY_DEATHS = 'day-deaths',
  DAY_RECOVERED = 'day-recovered',
  DAY_CONFIRMED_PER_100 = 'day-confirmed-per-100',
  DAY_DEATHS_PER_100 = 'day-deaths-per-100',
  DAY_RECOVERED_PER_100 = 'day-recovered-per-100',
};

export enum Screen {
  ALL = 'all',
  CHART = 'chart',
  LIST = 'list',
  MAP = 'map',
  TABLE = 'table',
}
