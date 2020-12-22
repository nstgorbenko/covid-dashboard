import axios from 'axios';
import React, { useContext } from 'react';

// import { AppContext } from '../../App';

import styles from './Search.scss';

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

const Search: React.SFC = () => {
  // const { country, updateCountry } = React.useContext(AppContext);

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(
    true
  );

  const [error, setError] = React.useState<string>('');

  const [info, setInfo] = React.useState<IPost>({
    // country,
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
        console.log(response.data);
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

  const handleSelectedCountry = (country: string) => {
    setInfo(
      posts.filter(val => val.country.toLowerCase().indexOf(country.toLowerCase()) !== -1)[0]
    );
  };

  console.log(info.country);

  return (
    <div className={styles['search']}>
      {loading && <p>...Loading</p>}
      <div className={styles['search__input-container']}>
        <input
          className={styles['search__bar']}
          type="text"
          placeholder="Search"
          onChange={e => setCountry(e.target.value)}
        />
        <select size={3} className={styles['select']}>
        {posts
          .filter(val => val.country.toLowerCase().indexOf(country.toLowerCase()) !== -1)
          .map(c => (
            <option key={c.country} onClick={() => handleSelectedCountry(c.country)}>
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

      {/* <div key={info.country}>
        <p>
          Country :
          {info.country}
        </p>
        <p>
          Cases:
          {info.cases}
        </p>
        <p>
          Today cases:
          {info.todayCases}
        </p>
        <p>
          Deaths:
          {info.deaths}
        </p>
        <p>
          Today deaths:
          {info.todayDeaths}
        </p>
        <p>
          Recovered:
          {info.recovered}
        </p>
        <p>
          Today recovered:
          {info.todayRecovered}
        </p>
        <img src={info.countryInfo.flag} alt="Flag" />
        <br />
      </div> */}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Search;

// const Search: React.FC = () => {
//   return (
//     <div className={styles['search']}>
//       <input className={styles['search__bar']} type="text" placeholder="Search"/>
//       <span className={styles['search__reset']}>
//         <svg className={styles['search__reset-icon']} width="36" height="36">
//           <use xlinkHref="#icon-search-reset"></use>
//         </svg>
//       </span>
//       <span className={styles['search__keyboard']}>
//         <svg className={styles['search__keyboard-icon']}>
//           <use xlinkHref="#icon-keyboard"></use>
//         </svg>
//       </span>
//     </div>
//   );
// };

// export default Search;
