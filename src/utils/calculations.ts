import { BillItem, Bill } from '../types';

export const calculateItemShare = (item: BillItem, participantId: string): number => {
  const assignment = item.assignedTo.find((a) => a.participantId === participantId);
  if (!assignment) return 0;
  const totalShares = item.assignedTo.reduce((sum, a) => sum + a.share, 0);
  if (totalShares === 0) return 0;
  return (assignment.share / totalShares) * item.totalPrice;
};

export const calculateParticipantSubtotal = (items: BillItem[], participantId: string): number => {
  return items.reduce((sum, item) => sum + calculateItemShare(item, participantId), 0);
};

export const calculateParticipantTotal = (
  bill: Bill,
  participantId: string,
  totalParticipants: number
): { subtotal: number; tip: number; discount: number; total: number } => {
  const billSubtotal = bill.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const participantSubtotal = calculateParticipantSubtotal(bill.items, participantId);

  // 1. Discount
  let discount = 0;
  if (bill.discountType === 'percent') {
    discount = participantSubtotal * (bill.discountValue / 100);
  } else if (bill.discountType === 'fixed' && billSubtotal > 0) {
    discount = bill.discountValue * (participantSubtotal / billSubtotal);
  }

  const subtotalAfterDiscount = Math.max(0, participantSubtotal - discount);

  // 2. Tips
  let tip = 0;
  const totalTip =
    bill.tipType === 'percent'
      ? billSubtotal * (bill.tipValue / 100)
      : bill.tipValue;

  if (bill.tipDistribution === 'equal') {
    tip = totalTip / totalParticipants;
  } else if (billSubtotal > 0) {
    tip = totalTip * (participantSubtotal / billSubtotal);
  }

  return {
    subtotal: participantSubtotal,
    tip,
    discount,
    total: subtotalAfterDiscount + tip,
  };
};
