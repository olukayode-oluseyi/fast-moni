import { Alert, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import AuthPagesLayout from "@/components/AuthPagesLayout";
import TextField from "@/components/Textfield";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/Auth";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const loginFn = (data) => {
  return axios
    .post(`${process.env.EXPO_PUBLIC_API_BASE_URL}/login`, {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    })
    .then((res) => {
      return res.data;
    });
};

export default function login() {
  const { login } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { mutate, isLoading } = useMutation(loginFn, {
    onSuccess: (data) => {

      login(data);
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response.data.error);

    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <AuthPagesLayout>
      <View
        style={{ paddingTop: 24, flex: 1, justifyContent: "space-between" }}
      >
        <View
          style={{
            gap: 32,
          }}
        >
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
                lineHeight: 24
              }}
            >
              Welcome back
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 16,
                color: '#475467'
              }}
            >
              Login to your account
            </Text>
          </View>
          <View style={{
            gap: 8
          }}>
          <TextField
            name={"email"}
            control={control}
            errors={errors}
            label="Email"
            placeholder="Enter your Email"
          />
          <TextField
            name={"password"}
            control={control}
            errors={errors}
            label="Password"
            placeholder="Enter your password"
          />
          </View>
        
        </View>
        <View
          style={{
            gap: 8,
          }}
        >
          <Button
            borderColor={"transparent"}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            title="Login"
          />
          <Button
            color={"#1D2939"}
            backgroundColor={"transparent"}
            borderColor={"#EAECF0"}
            borderWidth={1}
            onPress={() => router.push("register")}
            title="Register"
          />
        </View>
      </View>
    </AuthPagesLayout>
  );
}
