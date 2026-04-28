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

declare module 'expo-router/unstable-native-tabs' {
  export const NativeTabs: any;
  export const Icon: any;
  export const Label: any;
}
