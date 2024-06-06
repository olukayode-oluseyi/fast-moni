// components/Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  backgroundColor?: string;
  borderColor?: string,
  borderWidth?: number
  color?: string
}

const Button: React.FC<ButtonProps> = ({
  isLoading,
  title,
  style,
  backgroundColor = "#1D4EFF",
  color = "#fff",
  borderColor ,
  borderWidth = 0,
  ...rest
}) => {
  return (
    <TouchableOpacity style={[styles.button, {borderWidth, borderColor}, style, {backgroundColor}]} {...rest}>
      <Text style={{...styles.buttonText, color}}>{title}</Text>
      {
        isLoading && 
        <ActivityIndicator
        size={"small"}
        color={"white"}
      />
      }
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {

    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Button;
