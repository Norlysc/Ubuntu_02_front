import { Route, Routes } from 'react-router-dom';
import EditMicroentrepreneurship from '@/pages/admin-microentrepreneurship/pages/edit/EditMicroentrepreneurship';
import LoadMicroentrepreneurship from '@/pages/admin-microentrepreneurship/pages/load/LoadMicroentrepreneurship';
import Microentrepreneurship from '@/pages/admin-microentrepreneurship/pages/root/Microentrepreneurship';
import MicroentrepreneurshipDetail from '@/pages/admin-microentrepreneurship/pages/detail/MicroentrepreneurshipDetail';
import { ADMIN_ROUTES } from '@/constants/routes';
import GeoProvider from '@/contexts/GeoContext';

export default function MicroentrepreneurshipRouter() {
  return (
    <GeoProvider>
      <Routes>
        <Route
          path={ADMIN_ROUTES.MICROENTREPRENEURSHIPS.ROOT}
          element={<Microentrepreneurship />}
        />
        <Route
          path={ADMIN_ROUTES.MICROENTREPRENEURSHIPS.BY_ID}
          element={<MicroentrepreneurshipDetail />}
        />
        <Route
          path={ADMIN_ROUTES.MICROENTREPRENEURSHIPS.LOAD}
          element={<LoadMicroentrepreneurship />}
        />
        <Route
          path={ADMIN_ROUTES.MICROENTREPRENEURSHIPS.EDIT + '/:id'}
          element={<EditMicroentrepreneurship />}
        />
      </Routes>
    </GeoProvider>
  );
}
