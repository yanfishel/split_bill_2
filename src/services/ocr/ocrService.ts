import MlkitOcr, { OcrResultBlock } from 'react-native-mlkit-ocr';
import { parseReceipt } from './ocrParser';

export const ocrService = {
  async detectText(imageUri: string) {
    try {
      const result = await MlkitOcr.detectFromUri(imageUri);

      const lines: string[] = [];
      result.forEach((block: OcrResultBlock) => {
        lines.push(block.text);
      });

      return parseReceipt(lines);
    } catch (error) {
      console.error('OCR Detection error:', error);
      throw error;
    }
  }
};
