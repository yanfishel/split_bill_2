import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Stack, useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Доступ к камере', headerShown: true }} />
        <View style={styles.centered}>
          <Text style={styles.message}>Нам нужно ваше разрешение на использование камеры</Text>
          <Button onPress={requestPermission} title="Разрешить" />
        </View>
      </View>
    );
  }

  const handleCapture = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push('/new-bill/review');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Сканировать чек', headerShown: false }} />
      <CameraView style={styles.camera}>
        <SafeAreaView style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.guideContainer}>
            <View style={styles.guideFrame} />
            <Text style={styles.guideText}>Поместите чек в рамку</Text>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={handleCapture} style={styles.captureBtn}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    padding: 20,
    flexDirection: 'row',
  },
  closeBtn: {
    padding: 10,
  },
  guideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 16,
    borderStyle: 'dashed',
  },
  guideText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bottomBar: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
});
