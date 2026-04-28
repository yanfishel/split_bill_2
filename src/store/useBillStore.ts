import { create } from 'zustand';
import { Bill, BillItem } from '../types';

interface BillState {
  currentBill: Bill | null;
  startNewBill: (imageUri: string) => void;
  setOCRResults: (items: BillItem[], totalRaw: number, restaurantName?: string) => void;
  updateItem: (itemId: string, updates: Partial<BillItem>) => void;
  addItem: (item: BillItem) => void;
  removeItem: (itemId: string) => void;
  setTip: (tipType: 'percent' | 'fixed', tipValue: number, tipDistribution: 'equal' | 'proportional') => void;
  setDiscount: (discountType: 'percent' | 'fixed' | 'none', discountValue: number) => void;
  assignItem: (itemId: string, participantId: string) => void;
  unassignItem: (itemId: string, participantId: string) => void;
  resetCurrentBill: () => void;
}

export const useBillStore = create<BillState>((set) => ({
  currentBill: null,

  startNewBill: (imageUri: string) => {
    const newBill: Bill = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      imageUri,
      items: [],
      tipType: 'percent',
      tipValue: 0,
      discountType: 'none',
      discountValue: 0,
      tipDistribution: 'proportional',
      currency: 'RUB',
      totalRaw: 0,
      totalCalculated: 0,
    };
    set({ currentBill: newBill });
  },

  setOCRResults: (items, totalRaw, restaurantName) =>
    set((state) => ({
      currentBill: state.currentBill
        ? { ...state.currentBill, items, totalRaw, restaurantName }
        : null,
    })),

  updateItem: (itemId, updates) =>
    set((state) => ({
      currentBill: state.currentBill
        ? {
            ...state.currentBill,
            items: state.currentBill.items.map((item) =>
              item.id === itemId ? { ...item, ...updates } : item
            ),
          }
        : null,
    })),

  addItem: (item) =>
    set((state) => ({
      currentBill: state.currentBill
        ? { ...state.currentBill, items: [...state.currentBill.items, item] }
        : null,
    })),

  removeItem: (itemId) =>
    set((state) => ({
      currentBill: state.currentBill
        ? {
            ...state.currentBill,
            items: state.currentBill.items.filter((item) => item.id !== itemId),
          }
        : null,
    })),

  setTip: (tipType, tipValue, tipDistribution) =>
    set((state) => ({
      currentBill: state.currentBill
        ? { ...state.currentBill, tipType, tipValue, tipDistribution }
        : null,
    })),

  setDiscount: (discountType, discountValue) =>
    set((state) => ({
      currentBill: state.currentBill
        ? { ...state.currentBill, discountType, discountValue }
        : null,
    })),

  assignItem: (itemId, participantId) =>
    set((state) => {
      if (!state.currentBill) return state;
      const items = state.currentBill.items.map((item) => {
        if (item.id === itemId) {
          const alreadyAssigned = item.assignedTo.some((a) => a.participantId === participantId);
          if (alreadyAssigned) return item;
          return {
            ...item,
            assignedTo: [...item.assignedTo, { participantId, share: 1 }],
          };
        }
        return item;
      });
      return { currentBill: { ...state.currentBill, items } };
    }),

  unassignItem: (itemId, participantId) =>
    set((state) => {
      if (!state.currentBill) return state;
      const items = state.currentBill.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            assignedTo: item.assignedTo.filter((a) => a.participantId !== participantId),
          };
        }
        return item;
      });
      return { currentBill: { ...state.currentBill, items } };
    }),

  resetCurrentBill: () => set({ currentBill: null }),
}));
