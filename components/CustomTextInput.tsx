import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  minValue?: number;
  maxValue?: number;
  style?: object;
  containerStyle?: object;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  label,
  minValue = 0,
  maxValue = 100,
  style,
  containerStyle
}) => {
  const handleTextChange = (text: string) => {
    if (text === '') {
      onChangeText(text);
      return;
    }
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= minValue && num <= maxValue) {
      onChangeText(text);
    }
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        keyboardType="numeric"
        value={value}
        onChangeText={handleTextChange}
      />
    </View>
  );
};
