import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { ESP32_CAMERA_STREAM_URL } from "../config";
import { Ionicons } from "@expo/vector-icons";
import { CameraStyles } from "../styles/CameraStyles";
import { Colors } from "../styles/GlobalStyles";

export const CameraScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const checkConnection = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      clearTimeout(timeoutId);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 5000); 
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={CameraStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={CameraStyles.header}>
        <View style={CameraStyles.headerLeft}>
          <Text style={CameraStyles.headerTitle}>Camera Feed</Text>
        </View>
        <TouchableOpacity style={CameraStyles.fullscreenButton} onPress={toggleFullscreen} >
          <Ionicons name={isFullscreen ? "contract" : "expand"} size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {!isFullscreen && (
        <View style={CameraStyles.statusCard}>
          <Ionicons name="hardware-chip" size={20} color={Colors.textSecondary} />
          <Text style={CameraStyles.statusText}>Camera: {ESP32_CAMERA_STREAM_URL}</Text>
        </View>
      )}

      <View
        style={[ CameraStyles.cameraContainer, isFullscreen && CameraStyles.fullscreenContainer, ]}>
        <View style={CameraStyles.cameraFrame}>
          <WebView
            source={{ uri: ESP32_CAMERA_STREAM_URL }}
            style={CameraStyles.webview}
            javaScriptEnabled={false}
            scalesPageToFit={true}
            onLoadStart={() => { setIsLoading(true); setIsConnected(false);}}
            onLoadEnd={() => { setIsLoading(false); setIsConnected(true);}}
            onError={(error) => { console.log("WebView error:", error); setIsLoading(false); setIsConnected(false); }}
            onHttpError={(error) => {  console.log("HTTP error:", error); setIsLoading(false); setIsConnected(false); }}
          />

          <View style={CameraStyles.frameOverlay}>
            <View style={CameraStyles.corner} />
            <View style={[CameraStyles.corner, CameraStyles.topRight]} />
            <View style={[CameraStyles.corner, CameraStyles.bottomLeft]} />
            <View style={[CameraStyles.corner, CameraStyles.bottomRight]} />
          </View>
        </View>
      </View>
    </View>
  );
};