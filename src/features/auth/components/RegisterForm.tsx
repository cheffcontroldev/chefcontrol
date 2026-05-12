import { Link } from 'wouter';
import Input from '@/shared/components/Input';

export default function RegisterForm() {
  return (
    <div className="flex items-center justify-center">
      <form className="space-y-3" autoComplete="off">
        <Input type="text" placeholder="Nombre del Restaurante" />
        <Input type="text" placeholder="Nombre del Administrador" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Contraseña" />
        <Input type="password" placeholder="Confirmar Contraseña" />
        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <button className="btn btn-success">Registrarse</button>
          <p className="text-xs opacity-70">
            ¿Ya tienes una cuenta?{' '}
            <Link className="link" href="/login">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
