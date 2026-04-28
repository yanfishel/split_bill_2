export interface Participant {
  id: string;
  name: string;
  avatarColor: string; // Hex color
}

export interface Assignment {
  participantId: string;
  share: number; // 1 = full, 0.5 = half, etc.
}

export interface BillItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // unit price
  totalPrice: number; // quantity * price
  assignedTo: Assignment[];
}

export interface Bill {
  id: string;
  createdAt: string; // ISO 8601
  restaurantName?: string;
  imageUri: string;
  items: BillItem[];
  tipType: 'percent' | 'fixed';
  tipValue: number;
  discountType: 'percent' | 'fixed' | 'none';
  discountValue: number;
  tipDistribution: 'equal' | 'proportional';
  currency: string;
  totalRaw: number; // Sum from receipt
  totalCalculated: number; // Sum of items + tips
  groupId?: string;
}

export interface Group {
  id: string;
  name: string;
  createdAt: string;
  participantIds: string[];
}

export interface Session {
  id: string;
  billId: string;
  participants: Participant[];
  groupId?: string;
  createdAt: string;
}
