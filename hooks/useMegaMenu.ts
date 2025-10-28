'use client';

import { create } from 'zustand';

interface MegaMenuStore {
  isOpen: boolean;
  selected: string | null;
  open: () => void;
  close: () => void;
  setSelected: (slug: string) => void;
}

export const useMegaMenu = create<MegaMenuStore>((set) => ({
  isOpen: false,
  selected: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, selected: null }),
  setSelected: (slug: string) => set({ selected: slug }),
}));

