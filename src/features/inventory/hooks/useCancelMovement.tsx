/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMovement } from '../api';
import { useAuthStore } from '@/stores/authStore';
import { useMovementStore } from '../store/MovementStore';

/** A downstream movement that depends on the one being cancelled. */
interface Dependency {
  id: string;
  date: string;
  quantity: number;
  reason: string;
}

/**
 * Hook that manages the full cancellation flow for a movement.
 *
 * Cancellation is **two-phase**:
 * 1. `initiateCancel` tries a simple cancel; if the movement has downstream
 *    dependencies, the RPC returns them and the modal state is set.
 * 2. `confirmCancel` retries with `cascade: true`, which also cancels all
 *    dependent movements.
 */
export function useCancelMovement() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { setSelectedMovement } = useMovementStore();

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
      setSelectedMovement(null);
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
