import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getInitials } from '../../utils/colors';

interface AvatarProps {
  name: string;
  color: string;
  size?: number;
}

export const Avatar = ({ name, color, size = 40 }: AvatarProps) => {
  const initials = getInitials(name);

  return (
    <View style={[styles.avatar, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
