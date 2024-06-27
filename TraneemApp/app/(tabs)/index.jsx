import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  COLORS,
  FONTS,
  SIZES,
  windowWidth,
  windowHeight,
} from "@/constants/Theme";
import Header from "@/components/header/Header";
import { useFonts } from "expo-font";
import axios from "axios";
import { Link } from "expo-router";

export default function index() {
  const [categories, setCategories] = useState(null);
  LogBox.ignoreLogs([
    'fontFamily "ae_Khalid" is not a system font and has not been loaded through expo-font',
  ]);

  useEffect(() => {
    const getCategories = async () => {
      await axios.get("http://192.168.1.9:3000/api/data").then((response) => {
        setCategories(response.data);
      });
    };

    getCategories();
  }, []);

  const [fontLoaded] = useFonts({
    ae_Khalid: require("../../assets/fonts/ae_Khalid.ttf"),
  });

  if (!fontLoaded) return;

  return (
      <View style={styles.body}>
        <Header category_name={"الصفحة الرئيسية"} />

        <Image
          style={styles.image}
          source={require("@/assets/images/jesus.png")}
        />

        <View style={styles.CategoriesContainer}>
          {categories
            ? categories.map((category) => {
                return (
                  <TouchableHighlight key={category.id}>
                    <View style={styles.button}>
                      <Link
                        href={{
                          pathname: "Sounds",
                          params: {
                            category_id: category.id,
                            category_name: category.category_name,
                          },
                        }}
                        style={styles.text}
                      >
                        {" "}
                        {category.category_name}{" "}
                      </Link>
                    </View>
                  </TouchableHighlight>
                );
              })
            : null}

          <TouchableHighlight>
            <View style={[styles.button, { width: windowWidth / 2 }]}>
              <Link href={"About"} style={styles.text}>
                {" "}
                عن التطبيق{" "}
              </Link>
            </View>
          </TouchableHighlight>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  body: {
    color: COLORS.bg,
    fontFamily: FONTS.ae_Khalid || 'SpaceMono-Regular',
  },
  image: {
    width: windowWidth,
    height: windowHeight - 60,
    marginHorizontal: "auto",
    transform: [{ translateY: -windowHeight / 2.6 }, { translateX: 10 }],
  },
  CategoriesContainer: {
    justifyContent: "center",
    width: windowWidth - 50,
    // height: windowHeight / 10,
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 15,
    transform: [{ translateY: -windowHeight / 2.5 }],
  },
  button: {
    width: windowWidth / 2.5,
    backgroundColor: COLORS.black,
    borderRadius: 12,
    justifyContent: "center",
    height: 50,
    padding: 8,
  },
  text: {
    fontFamily: FONTS.ae_Khalid || 'SpaceMono-Regular',
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    textAlign: "center",
  },
});
