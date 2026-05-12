import { Mail, RectangleEllipsis, TextCursorInput, type LucideIcon } from 'lucide-react';

interface InputProps {
  type: 'email' | 'text' | 'password' | 'url';
  placeholder: string;
}

const iconMap: Record<InputProps['type'], LucideIcon> = {
  email: Mail,
  password: RectangleEllipsis,
  url: TextCursorInput,
  text: TextCursorInput,
};

export default function Input({ type, placeholder }: InputProps) {
  const Icon = iconMap[type];

  return (
    <div className="relative pb-5">
      <label className="input validator">
        <Icon className="size-4" />
        <input className="outside-none" type={type} placeholder={placeholder} required />
      </label>
      <div className="validator-hint absolute bottom-0 left-0 right-0 hidden">
        Ingresa un {type} válido
      </div>
    </div>
  );
}
