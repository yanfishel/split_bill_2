const AVATAR_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Turquoise
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
  '#F7DC6F', // Gold
  '#BB8FCE', // Purple
  '#85C1E9', // Sky
  '#F0B27A', // Orange
  '#82E0AA', // Light Green
];

export const getNextAvatarColor = (index: number): string => {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};
