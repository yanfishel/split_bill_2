import { getDb } from './db';
import { Bill, BillItem, Assignment } from '../../types';

export const billRepository = {
  async save(bill: Bill) {
    const db = await getDb();

    await db.withTransactionAsync(async () => {
      // Save Bill
      await db.runAsync(
        `INSERT INTO bills (
          id, created_at, restaurant_name, image_uri, tip_type, tip_value,
          discount_type, discount_value, tip_distribution, currency,
          total_raw, total_calculated, group_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bill.id, bill.createdAt, bill.restaurantName || null, bill.imageUri,
          bill.tipType, bill.tipValue, bill.discountType, bill.discountValue,
          bill.tipDistribution, bill.currency, bill.totalRaw,
          bill.totalCalculated, bill.groupId || null
        ]
      );

      // Save Items
      for (const item of bill.items) {
        await db.runAsync(
          'INSERT INTO bill_items (id, bill_id, name, quantity, price, total_price) VALUES (?, ?, ?, ?, ?, ?)',
          [item.id, bill.id, item.name, item.quantity, item.price, item.totalPrice]
        );

        // Save Assignments
        for (const assignment of item.assignedTo) {
          await db.runAsync(
            'INSERT INTO assignments (bill_item_id, participant_id, share) VALUES (?, ?, ?)',
            [item.id, assignment.participantId, assignment.share]
          );
        }
      }
    });
  },

  async getAll(): Promise<Bill[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<any>('SELECT * FROM bills ORDER BY created_at DESC');

    const bills: Bill[] = [];
    for (const row of rows) {
      bills.push({
        id: row.id,
        createdAt: row.created_at,
        restaurantName: row.restaurant_name,
        imageUri: row.image_uri,
        tipType: row.tip_type,
        tipValue: row.tip_value,
        discountType: row.discount_type,
        discountValue: row.discount_value,
        tipDistribution: row.tip_distribution,
        currency: row.currency,
        totalRaw: row.total_raw,
        totalCalculated: row.total_calculated,
        groupId: row.group_id,
        items: [],
      });
    }
    return bills;
  },
};
