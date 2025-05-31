import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { MotorControlScreen } from './screens/MotorControlScreen';
import { CameraScreen } from './screens/CameraScreen';
import { Colors } from './styles/GlobalStyles';

type RootTabParamList = {
  MotorControl: undefined;
  Camera: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, 
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'MotorControl') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textMuted,
          tabBarStyle: {
            backgroundColor: Colors.surface,
            borderTopColor: Colors.accent,
            borderTopWidth: 1,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        })}
      >
        <Tab.Screen name="MotorControl" component={MotorControlScreen} options={{ tabBarLabel: 'Motor Control', }} />
        <Tab.Screen name="Camera"       component={CameraScreen}       options={{ tabBarLabel: 'Camera',        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}