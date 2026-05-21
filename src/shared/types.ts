/**
 * User roles in the application.
 * @description Defines access levels:
 * - Administrador: Full access to all features
 * - Almacén: Manage inventory and movements
 * - Cocinero: View inventory (read-only)
 */
export type Role = 'Administrador' | 'Almacén' | 'Cocinero';

/**
 * Alert message types for the global notification system.
 * @description Used by uiStore to display user feedback:
 * - success: Operation completed successfully
 * - error: Something went wrong
 * - warning: Attention needed
 * - info: General information
 */
export type AlertType = 'success' | 'error' | 'warning' | 'info';

/**
 * Form interaction modes for modal CRUD operations.
 * @description Controls visibility and behavior of form modals:
 * - hidden: Form is not visible
 * - show: Form is in read-only display mode
 * - create: Form is in creation mode
 * - edit: Form is in editing mode
 */
export type FormMode = 'hidden' | 'show' | 'create' | 'edit';
