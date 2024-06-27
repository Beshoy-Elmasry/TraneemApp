import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { MenuProvider } from "react-native-popup-menu";

export default function RootLayout() {
  return (
    <MenuProvider>
      <RootSiblingParent>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </RootSiblingParent>
    </MenuProvider>
  );
}
