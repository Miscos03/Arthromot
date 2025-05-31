import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  label?: string;
  style?: object;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  label,
  style
}) => (
  <View style={[styles.sliderContainer, style]}>
    {label && <Text style={styles.label}>{label}</Text>}
    <Slider
      style={styles.slider}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      value={value}
      onValueChange={onValueChange}
    />
  </View>
);
