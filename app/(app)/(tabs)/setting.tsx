import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, useColorScheme } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/context/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import PromptModal from "@/components/PromptModal";
import { useState } from "react";

export default function TabTwoScreen() {
  const { user } = useUser();
  const {logout} = useAuth()
  const inset = useSafeAreaInsets();
  const [isPromptVisible, setPromptVisible] = useState(false);
  const backgroundColor={ light: "#A1CEDC", dark: "#1D3D47" }
  const colorScheme = useColorScheme() ?? 'light';

 
  const showPrompt = () => {
    setPromptVisible(true);
  };

  const hidePrompt = () => {
    setPromptVisible(false);
  };

  const handleOkay = () => {
    // Handle Okay action here
    logout()
    hidePrompt();
  };

  const handleCancel = () => {
    // Handle Cancel action here
    hidePrompt();
  };


  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingTop: inset.top || 10,
        paddingBottom: inset.bottom || 10,
        paddingHorizontal: 24,
        gap: 16
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40
        }}
      >
        <Image
          src={user?.avatar}
          style={{
            width: 100.16,
            height: 100.28,
            borderRadius: 80,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Link style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: '500'
          }} href={"edit"}>Edit Profile</Link>
        </View>
        <Button onPress={()=>{
        showPrompt()
        }} title="Logout" />
      </View>
      <PromptModal
        visible={isPromptVisible}
        message="Are you sure you want to proceed?"
        onCancel={handleCancel}
        onOkay={handleOkay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
