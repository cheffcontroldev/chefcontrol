import { Route, Router, Switch } from 'wouter';

import AuthGuard from './shared/guards/AuthGuard';

import AlertsPage from '@/pages/AlertsPage';
import AlertsConfigurationPage from './pages/AlertsConfigurationPage';
import AlertsExpiringLotsPage from './pages/AlertsExpiringLotsPage';
import AlertsLowStockPage from './pages/AlertsLowStockPage';
import CategoriesPage from '@/pages/CategoriesPage';
import CompleteRegistrationPage from '@/pages/CompleteRegistrationPage';
import DashboardPage from '@/pages/DashboardPage';
import InventoryPage from '@/pages/InventoryPage';
import InventoryReportPage from './pages/InventoryReportPage';
import LoginPage from '@/pages/LoginPage';
import LotsPage from '@/pages/LotsPage';
import MovementFormEntryPage from '@/pages/MovementFormEntryPage';
import MovementFormExitPage from './pages/MovementFormExitPage';
import MovementReportPage from './pages/MovementReportPage';
import MovementsPage from '@/pages/MovementsPage';
import ProductsPage from '@/pages/ProductsPage';
import RegisterPage from '@/pages/RegisterPage';
import ReportsPage from '@/pages/ReportsPage';
import RestaurantPage from '@/pages/RestaurantPage';
import SettingsPage from '@/pages/SettingsPage';
import UnitsOfMeasurePage from '@/pages/UnitsOfMeasurePage';
import UsersPage from '@/pages/UsersPage';

/** Root application component. Defines all routes wrapped in authentication guard. */
function App() {
  return (
    <Router>
      <AuthGuard>
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/ingresar" component={LoginPage} />
          <Route path="/registrarse" component={RegisterPage} />
          <Route path="/completar-registro" component={CompleteRegistrationPage} />
          <Route path="/inventario/productos" component={ProductsPage} />
          <Route path="/inventario/categorias" component={CategoriesPage} />
          <Route path="/inventario/unidades-de-medida" component={UnitsOfMeasurePage} />
          <Route path="/inventario" component={InventoryPage} />
          <Route path="/inventario/lotes" component={LotsPage} />
          <Route path="/inventario/registrar-entrada" component={MovementFormEntryPage} />
          <Route path="/inventario/registrar-salida" component={MovementFormExitPage} />
          <Route path="/inventario/movimientos" component={MovementsPage} />
          <Route path="/alertas" component={AlertsPage} />
          <Route path="/alertas/configuracion" component={AlertsConfigurationPage} />
          <Route path="/alertas/por-vencer" component={AlertsExpiringLotsPage} />
          <Route path="/alertas/bajo-stock" component={AlertsLowStockPage} />
          <Route path="/reportes" component={ReportsPage} />
          <Route path="/reportes/inventario" component={InventoryReportPage} />
          <Route path="/reportes/movimientos" component={MovementReportPage} />
          <Route path="/configuracion" component={SettingsPage} />
          <Route path="/configuracion/usuarios" component={UsersPage} />
          <Route path="/configuracion/restaurant" component={RestaurantPage} />
        </Switch>
      </AuthGuard>
    </Router>
  );
}

export default App;
