import React from 'react';

import LeafletMap from '@/components/LeafletMap';

import Table from './components/Table';

const App: React.FC = () => (
  <div>
    <Table />
    <LeafletMap />
  </div>
);

export default App;
