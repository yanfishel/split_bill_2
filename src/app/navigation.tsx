import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { GroupsScreen } from '../screens/GroupsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { OCRReviewScreen } from '../screens/OCRReviewScreen';
import { ParticipantsScreen } from '../screens/ParticipantsScreen';
import { AssignmentScreen } from '../screens/AssignmentScreen';
import { TipScreen } from '../screens/TipScreen';
import { SummaryScreen } from '../screens/SummaryScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Camera: undefined;
  OCRReview: undefined;
  Participants: undefined;
  Assignment: undefined;
  Tip: undefined;
  Summary: undefined;
};

export type TabParamList = {
  Home: undefined;
  History: undefined;
  Groups: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
    <Tab.Screen name="Groups" component={GroupsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export const RootNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Сканировать чек' }} />
      <Stack.Screen name="OCRReview" component={OCRReviewScreen} options={{ title: 'Проверка позиций' }} />
      <Stack.Screen name="Participants" component={ParticipantsScreen} options={{ title: 'Участники' }} />
      <Stack.Screen name="Assignment" component={AssignmentScreen} options={{ title: 'Распределение' }} />
      <Stack.Screen name="Tip" component={TipScreen} options={{ title: 'Чаевые' }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Итоги' }} />
    </Stack.Navigator>
  </NavigationContainer>
);
