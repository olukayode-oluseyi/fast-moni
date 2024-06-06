import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AuthPagesLayout from "@/components/AuthPagesLayout";
import Button from "@/components/Button";
import { useUser } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as SecureStore from "expo-secure-store";
import TextField from "@/components/Textfield";
import { editProfileSchema, registerSchema } from "@/schemas/Auth";
import { router } from "expo-router";

const updateUser = async ({
  userId,
  data,
}: {
 
  userId: number;
  data: any;
}) => {
  const token = await SecureStore.getItemAsync("token");

  if (!token) {
    throw new Error("You need to login first");
  }

  const response = await axios.put(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const edit = () => {
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });
  const queryClient = useQueryClient();

  const {
    mutate: mutateUser,
    error,
    isLoading,
  } = useMutation(updateUser, {
    onSuccess: (data) => {

      queryClient.invalidateQueries("fetchUserDetails");
      Alert.alert("Success", "Successfully updated user");
    },
  });

  const onSubmit = (data: any) => {
    const name = "morpheus";
    const job = "leader";
    mutateUser({ userId: 2, data: { name, job } });
  };

  return (
    <AuthPagesLayout>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingTop: 20
        }}
      >
        <View
          style={{
            gap: 32,
          }}
        >
          <TouchableOpacity onPress={() => router.replace("setting")}>
            <Text style={{
                fontSize: 14, 
                fontWeight: '500',
                lineHeight: 16
            }}>Go Back</Text>
          </TouchableOpacity>
          <View style={{
            gap: 16
          }}>
          <TextField
            name={"email"}
            errors={errors}
            control={control}
            label="Email"
            placeholder="Enter your email"
          />
          <TextField
            name={"first_name"}
            errors={errors}
            control={control}
            label="First name"
            placeholder="Enter your firstname"
          />
          <TextField
            name={"last_name"}
            errors={errors}
            control={control}
            label="Last name"
            placeholder="Enter your last name"
          />
          </View>
         
        </View>
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          title="Submit"
        />
      </View>
    </AuthPagesLayout>
  );
};

export default edit;

const styles = StyleSheet.create({});
