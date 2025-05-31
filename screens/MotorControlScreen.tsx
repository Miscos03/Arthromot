import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { CustomSlider } from "../components/CustomSlider";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ESP32_SERVER_IP } from "../config";
import { Ionicons } from "@expo/vector-icons";
import { MotorControlStyles } from "../styles/MotorControlStyles";
import { Colors } from "../styles/GlobalStyles";

type MotorControlProps = BottomTabScreenProps<any, "MotorControl">;

export const MotorControlScreen: React.FC<MotorControlProps> = ({ }) => {
  const [stepperAngle, setStepperAngle] = useState(90);
  const [isConnected, setIsConnected] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getWebSocketUrl = () => {
    let ip = ESP32_SERVER_IP;
    if (ip.startsWith('http://')) {
      ip = ip.substring(7);
    }
    if (ip.startsWith('https://')) {
      ip = ip.substring(8);
    }
    return `ws://${ip}/`;
  };

  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }

    try {
      const wsUrl = getWebSocketUrl();
      console.log('Connecting to WebSocket:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);
      
      connectionTimeoutRef.current = setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CONNECTING) {
          console.log('Connection timeout');
          wsRef.current.close();
        }
      }, 10000);
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
          connectionTimeoutRef.current = null;
        }
        
        setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(stepperAngle.toString());
          }
        }, 100);
      };
      
      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        wsRef.current = null;
        
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
          connectionTimeoutRef.current = null;
        }
        
        if (event.code !== 1000) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };
      
      wsRef.current.onerror = (error) => {
        console.log('WebSocket error:', error);
        setIsConnected(false);
      };
      
    } catch (error) {
      console.log('WebSocket connection failed:', error);
      setIsConnected(false);
      Alert.alert("Connection Error", "Failed to connect to ESP32");
    }
  };

  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendStepperAngle = (angle: number) => {
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(angle.toString());
        setIsConnected(true);
      } else {
        console.log('WebSocket not ready, state:', wsRef.current?.readyState);
        setIsConnected(false);
      }
    } catch (error) {
      setIsConnected(false);
      console.log('Failed to send stepper angle:', error);
    }
  };

  const onStepperChange = (value: number) => {
    setStepperAngle(value);
    
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      sendStepperAngle(value);
    }, 100);
  };

  const moveToPreset = (angle: number) => {
    setStepperAngle(angle);
    sendStepperAngle(angle);
  };

  return (
    <View style={MotorControlStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={MotorControlStyles.header}>
        <View style={MotorControlStyles.headerLeft}>
          <View style={[
              MotorControlStyles.statusDot,
              { backgroundColor: isConnected ? Colors.success : Colors.error },
            ]} />
          <Text style={MotorControlStyles.headerTitle}>Stepper Control</Text>
        </View>
        <TouchableOpacity  style={MotorControlStyles.headerButton} onPress={connectWebSocket} >
          <Ionicons name="refresh-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={MotorControlStyles.connectionInfo}>
        <Ionicons name="hardware-chip" size={20} color={Colors.textSecondary} />
        <Text style={MotorControlStyles.connectionText}>
          Motor: {ESP32_SERVER_IP} | WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>

      <ScrollView 
        style={MotorControlStyles.scrollContainer}
        contentContainerStyle={MotorControlStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={MotorControlStyles.motorCard}>
          <View style={MotorControlStyles.motorHeader}>
            <Ionicons name="construct" size={24} color={Colors.primary} />
            <Text style={MotorControlStyles.motorTitle}>Stepper Arm</Text>
            <View style={MotorControlStyles.speedBadge}>
              <Text style={MotorControlStyles.speedText}>{stepperAngle}°</Text>
            </View>
          </View>
          <View style={MotorControlStyles.sliderContainer}>
            <CustomSlider
              label=""
              value={stepperAngle}
              onValueChange={onStepperChange}
              minimumValue={0}
              maximumValue={180}
              step={1}
            />
          </View>
          <View style={MotorControlStyles.speedLabels}>
            <Text style={MotorControlStyles.speedLabel}>0°</Text>
            <Text style={MotorControlStyles.speedLabel}>90°</Text>
            <Text style={MotorControlStyles.speedLabel}>180°</Text>
          </View>
        </View>

        <View style={MotorControlStyles.presetContainer}>
          <Text style={MotorControlStyles.presetTitle}>Quick Positions</Text>
          <View style={MotorControlStyles.presetButtons}>
            <TouchableOpacity style={MotorControlStyles.presetButton} onPress={() => moveToPreset(0)}>
              <Text style={MotorControlStyles.presetText}>0°</Text>
            </TouchableOpacity>
            <TouchableOpacity style={MotorControlStyles.presetButton} onPress={() => moveToPreset(45)}>
              <Text style={MotorControlStyles.presetText}>45°</Text>
            </TouchableOpacity>
            <TouchableOpacity style={MotorControlStyles.presetButton} onPress={() => moveToPreset(90)}>
              <Text style={MotorControlStyles.presetText}>90°</Text>
            </TouchableOpacity>
            <TouchableOpacity style={MotorControlStyles.presetButton} onPress={() => moveToPreset(135)}>
              <Text style={MotorControlStyles.presetText}>135°</Text>
            </TouchableOpacity>
            <TouchableOpacity style={MotorControlStyles.presetButton} onPress={() => moveToPreset(180)}>
              <Text style={MotorControlStyles.presetText}>180°</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={MotorControlStyles.advancedContainer}>
          <Text style={MotorControlStyles.presetTitle}>Advanced Controls</Text>
          
          <View style={MotorControlStyles.fineAdjustContainer}>
            <Text style={MotorControlStyles.fineAdjustTitle}>Fine Adjustment</Text>
            <View style={MotorControlStyles.fineAdjustButtons}>
              <TouchableOpacity style={MotorControlStyles.fineAdjustButton} onPress={() => moveToPreset(Math.max(0, stepperAngle - 5))}>
                <Ionicons name="remove" size={16} color={Colors.white} />
                <Text style={MotorControlStyles.fineAdjustText}>-5°</Text>
              </TouchableOpacity>
              <TouchableOpacity style={MotorControlStyles.fineAdjustButton} onPress={() => moveToPreset(Math.max(0, stepperAngle - 1))}>
                <Ionicons name="chevron-back" size={16} color={Colors.white} />
                <Text style={MotorControlStyles.fineAdjustText}>-1°</Text>
              </TouchableOpacity>
              <TouchableOpacity style={MotorControlStyles.fineAdjustButton} onPress={() => moveToPreset(Math.min(180, stepperAngle + 1))}>
                <Ionicons name="chevron-forward" size={16} color={Colors.white} />
                <Text style={MotorControlStyles.fineAdjustText}>+1°</Text>
              </TouchableOpacity>
              <TouchableOpacity style={MotorControlStyles.fineAdjustButton} onPress={() => moveToPreset(Math.min(180, stepperAngle + 5))}>
                <Ionicons name="add" size={16} color={Colors.white} />
                <Text style={MotorControlStyles.fineAdjustText}>+5°</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={MotorControlStyles.statusContainer}>
            <Text style={MotorControlStyles.statusTitle}>Current Status</Text>
            <View style={MotorControlStyles.statusRow}>
              <Text style={MotorControlStyles.statusLabel}>Position:</Text>
              <Text style={MotorControlStyles.statusValue}>{stepperAngle}°</Text>
            </View>
            <View style={MotorControlStyles.statusRow}>
              <Text style={MotorControlStyles.statusLabel}>Connection:</Text>
              <Text style={[MotorControlStyles.statusValue, { color: isConnected ? Colors.success : Colors.error }]}>
                {isConnected ? "Connected" : "Disconnected"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};