import React, { useEffect } from 'react';
import { RootNavigation } from './src/app/navigation';
import { StatusBar } from 'expo-status-bar';
import { initDb } from './src/services/database/db';

export default function App() {
  useEffect(() => {
    initDb().catch((err) => console.error('Failed to init DB', err));
  }, []);

  return (
    <>
      <RootNavigation />
      <StatusBar style="auto" />
    </>
  );
}
