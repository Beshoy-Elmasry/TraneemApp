import { PixelRatio , Dimensions } from "react-native";

const fontScale = PixelRatio.getFontScale();
export const SIZES = {
  small: 14 * fontScale,
  medium: 18 * fontScale,
  large: 24 * fontScale,
  xLarge: 28 * fontScale,
  XXLarge: 34 * fontScale,
  IconSize: 22
};
export const COLORS = {
  bg: "#e8e8e8",
  cardBg: "#1F2937",
  second: "#4F46E5",
  white: "#FFF",
  black: "#212121",
  gray: "#ddd",
};

export const FONTS = {
  ae_Khalid: "ae_Khalid",
};

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
