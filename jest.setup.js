import {jest} from '@jest/globals';

jest.mock('react-native-mlkit-ocr', () => ({
  detectFromUri: jest.fn().mockResolvedValue([]),
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    NavigationContainer: ({children}) => children,
  };
});