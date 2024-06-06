import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TextField from "@/components/Textfield";
import { useForm } from "react-hook-form";
import AuthPagesLayout from "@/components/AuthPagesLayout";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/Auth";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const registerFn = (data: any) => {
  return axios
    .post(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/users`, {
      name: "morpheus",
      job: "leader",
    })
    .then((res) => {
      return res.data;
    });
};
const register = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { mutate, isLoading } = useMutation(registerFn, {
    onSuccess: (data) => {
      Alert.alert("Success", "Successsfully created user", [
        {
          text: "OK",
          onPress: () => router.push("signin"),
        },
      ]);
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response.data.error);
    },
  });

  const onSubmit = (data) => {
    mutate({
      name: "morpheus",
      job: "leader",
    });
  };
  return (
    <AuthPagesLayout>
      <View
        style={{
          paddingTop: 24,

          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: 32,
          }}
        >
          <TouchableOpacity onPress={() => router.replace("signin")}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                lineHeight: 16,
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
          <View
            style={{
              gap: 32,
            }}
          >
            {/* <TextField
            name={"username"}
            errors={errors}
            control={control}
            label="Username"
            placeholder="Enter your username"
          /> */}
            <View
              style={{
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  color: "#1D2939",
                  lineHeight: 24,
                }}
              >
                Get started
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  lineHeight: 16,
                  color: "#475467",
                }}
              >
                Create an account
              </Text>
            </View>

            <View
              style={{
                gap: 8,
              }}
            >
              <TextField
                name={"email"}
                errors={errors}
                control={control}
                label="Email"
                placeholder="Enter your email"
              />
              <TextField
                name={"password"}
                errors={errors}
                control={control}
                label="Password"
                placeholder="Enter your password"
              />
            </View>
          </View>
        </View>

        <View style={{}}>
          <Button
            borderWidth={0}
            onPress={handleSubmit(onSubmit)}
            title="Register"
            isLoading={isLoading}
          />
        </View>
      </View>
    </AuthPagesLayout>
  );
};

export default register;

const styles = StyleSheet.create({});
