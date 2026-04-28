import { create } from 'zustand';
import { Participant } from '../types';

interface ParticipantState {
  sessionParticipants: Participant[];
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: string) => void;
  setParticipants: (participants: Participant[]) => void;
  clearSession: () => void;
}

export const useParticipantStore = create<ParticipantState>((set) => ({
  sessionParticipants: [],
  addParticipant: (participant) =>
    set((state) => ({
      sessionParticipants: [...state.sessionParticipants, participant],
    })),
  removeParticipant: (id) =>
    set((state) => ({
      sessionParticipants: state.sessionParticipants.filter((p) => p.id !== id),
    })),
  setParticipants: (participants) => set({ sessionParticipants: participants }),
  clearSession: () => set({ sessionParticipants: [] }),
}));
