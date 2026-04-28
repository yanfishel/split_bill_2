// import MlkitOcr, { OcrResultBlock } from 'react-native-mlkit-ocr';
import { parseReceipt } from './ocrParser';

export const ocrService = {
  async detectText(imageUri: string) {
    try {
      // MOCK for Expo Go / Development
      console.warn('OCR is currently mocked for stability in Expo Go');
      const mockLines = [
        'Ресторан "Вкусный Уголок"',
        'Пицца Маргарита 1 x 450.00 450.00',
        'Кофе Латте 2 x 180.00 360.00',
        'Итого 810.00',
      ];

      return parseReceipt(mockLines);

      /*
      // Real implementation (requires native module)
      const result = await MlkitOcr.detectFromUri(imageUri);
      const lines: string[] = [];
      result.forEach((block: OcrResultBlock) => {
        lines.push(block.text);
      });
      return parseReceipt(lines);
      */
    } catch (error) {
      console.error('OCR Detection error:', error);
      throw error;
    }
  }
};
