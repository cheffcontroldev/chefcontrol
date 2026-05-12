import { Route, Router, Switch } from 'wouter';
import Layout from './shared/components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" component={() => <h1>Home</h1>} />
          <Route path="/ingresar" component={LoginPage} />
          <Route path="/registrarse" component={RegisterPage} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
