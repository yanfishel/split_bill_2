# SplitBill 0.2

SplitBill is a mobile application built with **React Native** and **Expo** designed to simplify the process of splitting restaurant bills among friends. It uses OCR (Optical Character Recognition) to read receipts and provides an intuitive interface for assigning items to participants.

## 🚀 Key Features

*   **Receipt Scanning**: Use your camera to take a photo of a receipt.
*   **Intelligent OCR Parsing**: Automatically extracts restaurant names, items, prices, and totals from receipt images.
*   **Manual Correction**: Review and edit parsed items to ensure 100% accuracy.
*   **Effortless Assignment**: Tap participant avatars to assign bill items. Costs are automatically split for multi-person items.
*   **Advanced Calculations**:
    *   Percentage or fixed-amount tips.
    *   Proportional or equal tip distribution.
    *   Fixed-amount discounts.
*   **Sharing Results**: Generate a clean text summary of who owes what and share it via your favorite messenger.
*   **Persistent History**: Save your shared bills and participant groups locally using SQLite.
*   **Type Safe**: 100% TypeScript implementation for a robust developer experience.

## 🛠 Technical Stack

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Managed Workflow)
*   **Navigation**: [React Navigation v6](https://reactnavigation.org/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Database**: [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
*   **OCR Engine**: [react-native-mlkit-ocr](https://github.com/agrousset/react-native-mlkit-ocr) (Google ML Kit)
*   **Icons**: [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📁 Project Structure

```text
src/
├── app/             # Navigation configuration and root providers
├── components/      # Reusable UI components
│   ├── bill/        # Components specific to bill processing
│   ├── participant/ # Components for participant management
│   └── ui/          # Generic UI primitives (Button, Input, Avatar)
├── screens/         # Main application screens
├── services/        # External services
│   ├── database/    # SQLite initialization and repositories
│   └── ocr/         # OCR logic and parsing algorithms
├── store/           # Zustand state stores
├── types/           # TypeScript interfaces and definitions
└── utils/           # Helper functions (calculations, colors, logger)
```

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   Expo Go app on your physical device (for testing OCR and Camera)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd split_bill_2
    ```

2.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Start the project**:
    ```bash
    npm start
    ```

4.  **Run on a simulator/device**:
    *   Press `i` for iOS simulator.
    *   Press `a` for Android emulator.
    *   Scan the QR code with your phone's camera (iOS) or Expo Go app (Android) to run on a physical device.

## ⚠️ Important Note on OCR

The OCR functionality requires native modules provided by `react-native-mlkit-ocr`. While the app structure and navigation work in the standard **Expo Go** app, full OCR testing on a physical device or simulator may require a **Development Build**:

```bash
npx expo run:ios
# or
npx expo run:android
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
