import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './Search.scss';
import { Parameter, Screen } from '@/constants/constants';
import { ActionCreator } from '@/store/app/app';
import { getActiveScreen, getCountry, getParameter } from '@/store/app/selector';
import { getCountriesData } from '@/store/data/selector';
import { CountryDataInterface, StateInterface } from '@/types/entities';

interface ListProps {
  fullScreen: Screen;
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  changeCountry(country: string): void;
}

interface IPost {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  countryInfo: { flag: string };
}

const defaultPosts: IPost[] = [];

const Search: React.FC<ListProps> = (props: ListProps) => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(
    true
  );
  const [error, setError] = React.useState<string>('');
  const [info, setInfo] = React.useState<IPost>({
    country: '',
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    todayRecovered: 0,
    countryInfo: { flag: '' },
  });
  const [country, setCountry]: [string, (error: string) => void] = React.useState('');

  React.useEffect(() => {
    axios
      .get<IPost[]>('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(ex => {
        const err = axios.isCancel(ex)
          ? 'Request cancelled'
          : ex.code === 'ECONNABORTED'
            ? 'A timeout has occurred'
            : ex.response.status === 404
              ? 'Resource not found'
              : 'An unexpected error has occurred';
        setError(err);
        setLoading(false);
      });
  }, []);

React.useEffect(() => {
  props.changeCountry(info.country);
}, [info.country]);

const handleSelectedCountry = (country: string) => {
  setInfo(
    posts.filter(val => val.country.toLowerCase().indexOf(country.toLowerCase()) !== -1)[0]
  );
};

const renderSelect = (event:any) => {
  event.target.nextSibling.style.visibility = 'visible';
}

const hideSelect = (event:any) => {
  event.target.nextSibling.style.visibility = 'hidden';
}

  return (
    <div className={styles['search']}>
      <div className={styles['search__input-container']}>
        <input
          className={styles['search__bar']}
          type="text"
          placeholder="Search"
          onChange={e => setCountry(e.target.value)}
          onFocus={renderSelect}
          onBlur={hideSelect}
        />
        <select size={3} id={'select'} className={styles['search__select']}>
          {posts
            .filter(val => val.country.toLowerCase().indexOf(country.toLowerCase()) !== -1)
            .map(c => (
              <option key={c.country} className={styles['select__options']} onMouseDown={() => {
                handleSelectedCountry(c.country);
              }}>
                {c.country}
              </option>
            ))}
        </select>
      </div>
      <span className={styles['search__reset']}>
        <svg className={styles['search__reset-icon']} width="36" height="36">
          <use xlinkHref="#icon-search-reset" />
        </svg>
      </span>
      <span className={styles['search__keyboard']}>
        <svg className={styles['search__keyboard-icon']}>
          <use xlinkHref="#icon-keyboard" />
        </svg>
      </span>
      {error && <p>{error}</p>}
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  fullScreen: getActiveScreen(state),
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeCountry(country: string) {
    dispatch(ActionCreator.changeCountry(country));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
