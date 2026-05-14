import FormModalButtons from './FormModalButtons';
import type { FormMode } from '../types';

interface FormModalProps {
  formMode: FormMode;
  setFormMode: (formMode: FormMode) => void;
}

export default function FormModal({
  children,
  formMode,
  setFormMode,
}: FormModalProps & { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center bg-base-300 opacity-70 backdrop-blur-xl z-10">
      <div className="card bg-base-100 shadow-xl w-full max-w-5xl z-50">
        <div className="p-6">{children}</div>
        <FormModalButtons formMode={formMode} setFormMode={setFormMode} />
      </div>
    </div>
  );
}
