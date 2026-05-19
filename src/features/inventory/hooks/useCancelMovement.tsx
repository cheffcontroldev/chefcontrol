/* eslint-disable @typescript-eslint/no-explicit-any */
// features/inventory/hooks/useCancelMovement.ts
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMovement } from '../api';
import { useAuthStore } from '@/stores/authStore';

interface Dependency {
  id: string;
  date: string;
  quantity: number;
  reason: string;
}

export function useCancelMovement() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [pendingMovementId, setPendingMovementId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ movementId, cascade }: { movementId: string; cascade: boolean }) =>
      cancelMovement(movementId, user!.id, cascade),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      queryClient.invalidateQueries({ queryKey: ['lots'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      closeConfirm();
    },
  });

  const initiateCancel = async (movementId: string) => {
    try {
      await mutation.mutateAsync({ movementId, cascade: false });

      setDependencies([]);
      setPendingMovementId(movementId);
      setShowConfirmModal(true);
    } catch (error) {
      if ((error as any).hasDependencies) {
        setDependencies((error as any).dependencies);
        setPendingMovementId(movementId);
        setShowConfirmModal(true);
        return;
      }
      throw error;
    }
  };

  const confirmCancel = async () => {
    if (!pendingMovementId) return;
    await mutation.mutateAsync({
      movementId: pendingMovementId,
      cascade: dependencies.length > 0,
    });
  };

  const closeConfirm = () => {
    setShowConfirmModal(false);
    setDependencies([]);
    setPendingMovementId(null);
  };

  return {
    initiateCancel,
    confirmCancel,
    closeConfirm,
    dependencies,
    showConfirmModal,
    isLoading: mutation.isPending,
  };
}
