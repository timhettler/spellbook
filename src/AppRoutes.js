import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ConnectedApp from './containers/ConnectedApp';
import SelectedSpellDetail from 'containers/SelectedSpellDetail';
import NoSelection from 'components/NoSelection';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ConnectedApp />}>
        <Route path="spell">
          <Route path=":spellId" element={<SelectedSpellDetail />} />
        </Route>
        <Route index element={<NoSelection />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
