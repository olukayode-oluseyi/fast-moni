import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "react-query";
import axios from "axios";
import { useUser } from "@/context/UserContext";

export default function HomeScreen() {
  const { logout } = useAuth();
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <ActivityIndicator />
    </View>;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <ThemedView style={styles.titleContainer}>
      
        <ThemedText type="title">
          Welcome! {user?.first_name} {user?.last_name}
        </ThemedText>

        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
  },
});
