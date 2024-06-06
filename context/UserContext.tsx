import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext";
import { useQuery } from "react-query";
import axios from "axios";




interface User {
    id: number;
    name: string;
    email: string;
    first_name: string,
    last_name: string,
    avatar: string

  }
  interface UserContextType {
    user: User | null;
    isLoadingUser: boolean;
  }
  
  const UserContext = createContext<UserContextType | undefined>(undefined);
  

const fetchUserDetails = async (): Promise<User> => {
  const token = await SecureStore.getItemAsync("token");
  
  if (!token) {
    throw new Error("You need to login first");
  }

  const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/users/2`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<User, Error>("fetchUserDetails", fetchUserDetails, {
    enabled: isLoggedIn, 
    retry: false, 
    onError: (error)=>{
        //console.log(error.response, 'error')
    }
  });



  return (
    <UserContext.Provider value={{ user, isLoadingUser: isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
