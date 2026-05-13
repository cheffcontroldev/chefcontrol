import { Route, Router, Switch } from 'wouter';
import AlertsPage from '@/pages/AlertsPage';
import CategoriesPage from '@/pages/CategoriesPage';
import CompleteRegistrationPage from '@/pages/CompleteRegistrationPage';
import DashboardPage from '@/pages/DashboardPage';
import InventoryPage from '@/pages/InventoryPage';
import Layout from '@/shared/components/Layout';
import LoginPage from '@/pages/LoginPage';
import MovementsPage from '@/pages/MovementsPage';
import ProductsPage from '@/pages/ProductsPage';
import RegisterPage from '@/pages/RegisterPage';
import ReportsPage from '@/pages/ReportsPage';
import SettingsPage from '@/pages/SettingsPage';
import UnitsOfMeasurePage from '@/pages/UnitsOfMeasurePage';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/ingresar" component={LoginPage} />
          <Route path="/registrarse" component={RegisterPage} />
          <Route path="/completar-registro" component={CompleteRegistrationPage} />
          <Route path="/inventario/productos" component={ProductsPage} />
          <Route path="/inventario/categorias" component={CategoriesPage} />
          <Route path="/inventario/unidades-de-medida" component={UnitsOfMeasurePage} />
          <Route path="/inventario" component={InventoryPage} />
          <Route path="/inventario/movimientos" component={MovementsPage} />
          <Route path="/alertas" component={AlertsPage} />
          <Route path="/reportes" component={ReportsPage} />
          <Route path="/configuracion" component={SettingsPage} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
