import { Routes, Route } from 'react-router-dom';

import VisitorMicroentrepreneurship from '@/pages/microemprendimientos/VisitorMicroentrepreneurship';
import CategoryDetails from '@/pages/microemprendimientos/components/categories/CategoryDetails';
import { USER_ROUTES } from '@/constants/routes';
import MicroenterpriseContact from '@/pages/microemprendimientos/components/visitor-entrepreneurships/MicroenterpriseContact';

export default function VisitorMicroentrepreurshipRouter() {
  return (
    <Routes>
      <Route
        path={USER_ROUTES.MICROENTREPRENEURSHIPS.ROOT}
        element={<VisitorMicroentrepreneurship />}
      />
      <Route path={USER_ROUTES.MICROENTREPRENEURSHIPS.BY_CATEGORY} element={<CategoryDetails />} />
      <Route
        path={USER_ROUTES.MICROENTREPRENEURSHIPS.CONTACT}
        element={<MicroenterpriseContact />}
      />
    </Routes>
  );
}
