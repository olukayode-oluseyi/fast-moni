
import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter()
  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const IsSignedIn = await AsyncStorage.getItem("isUserSignedIn");

      if (JSON.parse(IsSignedIn)) {
        setIsLoggedIn(true);
        router.replace('/')
      } else {
        // setLoadingLocalStorage(false);
      }
    } catch (error) {
      // setLoadingLocalStorage(false);
    } finally {
     //setLoadingLocalStorage(false);
    }
  }

  const login = async (data) => {
  console.log(data)
    AsyncStorage.setItem("isUserSignedIn", JSON.stringify(true));
    await SecureStore.setItemAsync("token", JSON.stringify(data.token));
    setIsLoggedIn(true);
    router.replace('/')
  };

  const logout = async () => {
    let keys = [
        "isUserSignedIn",
      ];
     await AsyncStorage.multiRemove(keys, (err) => {});
    await SecureStore.deleteItemAsync("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
