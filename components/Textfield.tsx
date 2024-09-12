// components/TextField.js
import React, { ReactNode } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  control?: any;
  errors: any;
  name: string;
  label?: string;
  placeholder?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  backgroundColor?: string;
  labelColor?: string;
  textColor?: string;
  fontSize?: number;
  padding?: number;
  margin?: number;
  rules?: object;
  children?: ReactNode;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  borderRadius = 10,
  borderColor = "#EAECF0",
  borderWidth = 1,
  errors,
  labelColor = "#1D2939",
  textColor = "#1D2939",
  fontSize = 16,
  padding = 12,

  name,
  control,
  rules = {},
}) => {
  return (
    <View style={[styles.container]}>
      {label && (
        <Text style={[styles.label, { color: labelColor, fontWeight: "600" }]}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            style={[
              styles.input,
              {
                borderRadius,
                borderColor: errors && errors[name] ? "#F04438" : borderColor,
                borderWidth,
                // backgroundColor,
                color: textColor,
                fontSize,
                padding,
              },
            ]}
            placeholderTextColor="#999"
          />
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />
      {errors[name] && (
        <View
          style={{
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              lineHeight: 16,
              fontSize: 14,
              color: "#F04438",
            }}
          >
            {errors[name]?.message}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    width: "100%",
  },
});

export default TextField;
