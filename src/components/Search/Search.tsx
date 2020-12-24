import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styles from './Search.scss';
import { ActionCreator } from '@/store/app/app';
import { getCountry } from '@/store/app/selector';
import { getCountriesData } from '@/store/data/selector';
import { CountryDataInterface, StateInterface } from '@/types/entities';
import { Operation } from '@/store/data/data';

interface SearchProps {
  country: string;
  countriesData: Array<CountryDataInterface>;
  changeCountry(country: string): void;
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { country, countriesData, changeCountry } = props;
  const countries = countriesData.map(({ country }) => country);

  const [currentCountry, setCurrentCountry] = useState('');
  const inputElement = useRef(null);

  const renderSelect = (event:any) => {
    event.target.nextSibling.style.visibility = 'visible';
  }
  const hideSelect = (event:any) => {
    event.target.nextSibling.style.visibility = 'hidden';
  }
  const onButtonClick = (newCountry: string) => {
    (inputElement.current as unknown as HTMLInputElement).value = newCountry;
  };

  useEffect(() => {
    onButtonClick(country);
  }, [country])

  return (
    <div className={styles['search']}>
      <div className={styles['search__input-container']}>
        <input
          ref={inputElement}
          className={styles['search__bar']}
          type="text"
          placeholder="Search"
          defaultValue={country}
          onChange={e => {
            setCurrentCountry(e.target.value);
          }}
          onFocus={renderSelect}
          onBlur={hideSelect}
        />
        <select size={3} className={styles['search__select']}>
          {countries
            .filter((country) => country.toLowerCase().indexOf(currentCountry.toLowerCase()) !== -1)
            .map((country) =>
              <option
                key={country}
                className={styles['select__options']}
                onMouseDown={() => {
                  changeCountry(country);
                  onButtonClick(country);
                }}>{country}
              </option>
          )}
        </select>
      </div>
      <span className={styles['search__reset']} onClick={() => {
        changeCountry('');
        onButtonClick('');
        }}>
        <svg className={styles['search__reset-icon']} width="36" height="36">
          <use xlinkHref="#icon-search-reset" />
        </svg>
      </span>
      <span className={styles['search__keyboard']}>
        <svg className={styles['search__keyboard-icon']}>
          <use xlinkHref="#icon-keyboard" />
        </svg>
      </span>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  country: getCountry(state),
  countriesData: getCountriesData(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeCountry(country: string) {
    dispatch(Operation.loadCountryHistoricalData(country))
      .then(() => dispatch(ActionCreator.changeCountry(country)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
