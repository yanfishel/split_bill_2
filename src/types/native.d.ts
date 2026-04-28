declare module 'react-native-mlkit-ocr' {
  export interface OcrResultBlock {
    text: string;
    cornerPoints: number[][];
    bounding: {
      left: number;
      top: number;
      height: number;
      width: number;
    };
    lines: any[];
  }

  export default class MlkitOcr {
    static detectFromUri(uri: string): Promise<OcrResultBlock[]>;
  }
}
