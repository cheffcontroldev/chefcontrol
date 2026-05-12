import { Link } from 'wouter';
import Input from '@/shared/components/Input';

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center">
      <form className="space-y-3" autoComplete="off">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Contraseña" />
        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <button className="btn btn-success">Iniciar Sesión</button>
          <p className="text-xs opacity-70">
            ¿No tienes una cuenta?{' '}
            <Link className="link" href="/register">
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
