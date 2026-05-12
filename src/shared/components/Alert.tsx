import { useUiStore } from '@/stores/uiStore';

export default function Alert() {
  const { alertType, alertMessage, showAlert } = useUiStore();

  if (!showAlert) return null;

  return (
    <div
      className={`alert absolute bottom-4 left-1/2 translate-x-[-50%] alert-${alertType} text-center`}
    >
      {alertMessage}
    </div>
  );
}
