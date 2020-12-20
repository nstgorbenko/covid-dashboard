import React from 'react';

import Page from '@/components/Page';
import { CountryInfo } from '@/types/entities';

interface AppProps {
  countriesInfo: Array<CountryInfo>;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { countriesInfo } = props;

  return (
    <Page countriesInfo={countriesInfo} />
  );
};

export default App;
