import axios from 'axios';
import React from 'react';

interface IPost {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  flag: string;
}

const inputStyle = {
  width: '600px',
  padding: '23px',
  fontSize: '37px',
  borderWidth: '0px',
  borderColor: '#CCCCCC',
  backgroundColor: '#FFFFFF',
  color: '#000000',
  borderRadius: '38px',
  boxShadow: '-5px 0px 30px rgba(66,66,66,.50)',
  textShadow: '0px 0px 5px rgba(66,66,66,.0)',
  paddingTop: '20px',
};

const defaultPosts: IPost[] = [];

const Table: React.SFC = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(
    defaultPosts
  );

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState(
    ''
  );

  const [country, setCountry]: [string, (error: string) => void] = React.useState(
    ''
  );

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

  return (
    <div>
      {loading && <p>...Loading</p>}
      <input type="text" style={inputStyle} onChange={e => setCountry(e.target.value)} />
      {posts.filter(val => val.country.toLowerCase().indexOf(country.toLowerCase()) !== -1)
        .map(c => (
  /*        указать типы */
          <div>
            <p>Country : {c.country}</p>
            <p>Cases: {c.cases}</p>
            <p>Today cases: {c.todayCases}</p>
            <p>Deaths: {c.deaths}</p>
            <p>Today deaths: {c.todayDeaths}</p>
            <p>Recovered: {c.recovered}</p>
            <p>Today recovered: {c.todayRecovered}</p>
            <img src={c.countryInfo.flag} alt='Flag' />
            <br />
          </div>
        ))
      }
      {error && <p>{error}</p>}
    </div>
  );
};

export default Table;
