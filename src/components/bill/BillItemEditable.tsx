import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { BillItem } from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

interface BillItemEditableProps {
  item: BillItem;
  onUpdate: (updates: Partial<BillItem>) => void;
  onRemove: () => void;
}

export const BillItemEditable = ({ item, onUpdate, onRemove }: BillItemEditableProps) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.input, styles.nameInput]}
      value={item.name}
      onChangeText={(text) => onUpdate({ name: text })}
      placeholder="Название"
    />
    <TextInput
      style={[styles.input, styles.qtyInput]}
      value={item.quantity.toString()}
      onChangeText={(text) => onUpdate({ quantity: parseFloat(text) || 0, totalPrice: parseFloat(text) * item.price || 0 })}
      keyboardType="numeric"
      placeholder="К-во"
    />
    <TextInput
      style={[styles.input, styles.priceInput]}
      value={item.price.toString()}
      onChangeText={(text) => onUpdate({ price: parseFloat(text) || 0, totalPrice: item.quantity * parseFloat(text) || 0 })}
      keyboardType="numeric"
      placeholder="Цена"
    />
    <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
      <Icon name="trash-outline" size={24} color="#FF3B30" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 4,
    fontSize: 14,
    marginRight: 8,
  },
  nameInput: { flex: 3 },
  qtyInput: { flex: 1, textAlign: 'center' },
  priceInput: { flex: 1.5, textAlign: 'right' },
  removeBtn: { padding: 4 },
});
