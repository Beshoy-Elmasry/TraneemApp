import { Tabs } from "expo-router";
import { MaterialCommunityIcons , MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES, windowWidth } from "./../../constants/Theme";
// import { BlurView } from "expo-blur";
import { StatusBar } from "react-native";

export default function HomeLayout() {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle={"light-content"}
        hidden={true}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.white,
          tabBarLabelStyle: {
            fontSize: SIZES.small + 2,
            fontWeight: "500",
            fontFamily: FONTS.ae_Khalid,
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            paddingTop: 8,
            paddingBottom: 5,
            // height: 65,
            backgroundColor: COLORS.black,
            width: windowWidth,
            height: 60,
            paddingHorizontal: 10
            // zIndex: -1
          },

          // tabBarBackground: () => (
          //   <BlurView
          //     intensity={95}
          //     style={{
          //       ...StyleSheet.absoluteFillObject,
          //       overflow: "hidden",
          //       borderTopLeftRadius: 20,
          //       borderTopRightRadius: 20,
          //       backgroundColor: COLORS.white,
          //     }}
          //   />
          // ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "الرئيسية",
            tabBarIcon: ({ tintColor, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                color={tintColor}
                size={SIZES.IconSize}
                style={{
                  color: "#fff",
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="About"
          options={{
            title: "عن التطبيق",
            tabBarIcon: ({ tintColor, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "information" : "information-outline"}
                color={tintColor}
                size={SIZES.IconSize}
                style={{
                  color: "#fff",
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Sounds"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen 
          name="Playlists"
          options={{
            title: "قوائم التشغيل",
            tabBarIcon: ({ tintColor, focused }) => (
              <MaterialCommunityIcons
                name={focused? "playlist-music" : "playlist-music-outline"}
                color={tintColor}
                size={SIZES.IconSize}
                style={{
                  color: "#fff",
                }}
              />
            ),
          }}
        />

        <Tabs.Screen 
          name="Favorite"
          options={{
            title: "المفضلة",
            tabBarIcon: ({ tintColor, focused }) => (
              <MaterialIcons
                name={focused? "favorite" : "favorite-outline"}
                color={tintColor}
                size={SIZES.IconSize}
                style={{
                  color: "#fff",
                }}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
        name="Favorite"
        options={{
          title: 'المفضلة',
          tabBarIcon: ({ tintColor, focused }) => (
            <AntDesign
              name={focused ? "heart" : "hearto"}
              color={tintColor}
              size={28}
            />
          ),
          params: {
            api: 'http://192.168.1.9:3000/api/data/favorite',
            // category_id: 'favorite'
          }
        }}
      />
      <Tabs.Screen
        name="Traneem"
        options={{
          href: null,
        }}
      /> */}
      </Tabs>
    </>
  );
}
