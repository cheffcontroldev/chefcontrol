import FormModal from '@/shared/components/FormModal';
import { useUiStore } from '@/stores/uiStore';

export default function UserForm() {
  const { userFormMode, setUserFormMode } = useUiStore();
  return (
    userFormMode !== 'hidden' && (
      <FormModal formMode={userFormMode} setFormMode={setUserFormMode}>
        <div>Form</div>
      </FormModal>
    )
  );
}
