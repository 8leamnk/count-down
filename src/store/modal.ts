import type { ModalInfo } from '../types/global';
import { create } from 'zustand';

interface ModalInfoState {
  modalInfo: ModalInfo | null;
  openModal: (newInfo: ModalInfo) => void;
  closeModal: () => void;
}

export const useModalInfo = create<ModalInfoState>((set) => ({
  modalInfo: null,
  openModal: (newInfo) => set(() => ({ modalInfo: newInfo })),
  closeModal: () => set(() => ({ modalInfo: null })),
}));
