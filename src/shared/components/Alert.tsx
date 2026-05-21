import { useUiStore } from '@/stores/uiStore';

/**
 * Global alert notification component.
 * @description Displays a floating alert message at the bottom center of the screen.
 * Reads alert state from uiStore — shows/hides based on `showAlert` flag
 * and styles according to `alertType` (success, error, warning, info).
 * Auto-hides after 5 seconds (controlled by uiStore).
 *
 * @example
 * ```tsx
 * // In any component:
 * setShowAlertMessage('success', 'Usuario creado exitosamente');
 * // Alert.tsx renders it globally
 * ```
 *
 * @returns The alert element, or null if showAlert is false
 */
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
