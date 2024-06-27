import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  COLORS,
  FONTS,
  SIZES,
  windowHeight,
  windowWidth,
} from "@/constants/Theme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";
import useSoundStore from "@/dataStore/store";
import { SoundState } from "./SoundOperations";

let id;

const Footer = (props) => {
  const currentSound = props.soundId;
  const category_id = props.category_id;
  const playlist_id = props.playlist_id;

  id = playlist_id;

  const sound = useSoundStore((state) => state.sound);

  const soundisPlaying = useSoundStore((state) => state.soundisPlaying);
  const setSoundIsPlaying = useSoundStore((state) => state.setSoundIsPlaying);

  const [currentSoundName, setCurrentSoundName] = useState(null);

  useEffect(() => {
    if (currentSound) {
      const getSoundName = async () => {
        if (category_id === "playlists") {
          await axios
            .get(
              `http://192.168.1.9:3000/api/${category_id}/${playlist_id}/sound/${currentSound}`
            )
            .then(async (response) => {
              if (response.data[0]) {
                await setCurrentSoundName(response.data[0].sound_name);
              }
            });
        } else if (category_id === "favorite") {
          await axios
            .get(
              `http://192.168.1.9:3000/api/data/${category_id}/sound/${currentSound}`
            )
            .then(async (response) => {
              if (response.data[0]) {
                await setCurrentSoundName(response.data[0].sound_name);
              }
            });
        } else {
          await axios
            .get(
              `http://192.168.1.9:3000/api/data/${category_id}/sound/${currentSound}`
            )
            .then(async (response) => {
              if (response.data[0]) {
                await setCurrentSoundName(response.data[0].sound_name);
              }
            });
        }
      };
      getSoundName();
    }
  }, [currentSound]);

  let mgB;
  if (category_id === "playlists") {
    mgB = 210;
  } else if (category_id === "favorite") {
    mgB = 80;
  } else {
    mgB = 170;
  }

  return (
    <View style={[styles.FooterContainer, { marginBottom: mgB }]}>
      {currentSound && (
        <>
          {/* <Pressable>
                <AntDesign name="stepforward" size={24} color = {COLORS.black} />
            </Pressable>
    
            <Pressable>
                <AntDesign name="stepbackward" size={24} color = {COLORS.black} />
            </Pressable> */}

          {soundisPlaying ? (
            <Pressable
              onPress={() =>
                SoundState(sound, soundisPlaying, setSoundIsPlaying)
              }
            >
              <AntDesign name="pause" size={24} color="black" />
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                SoundState(sound, soundisPlaying, setSoundIsPlaying)
              }
            >
              <Entypo name="controller-play" size={24} color="black" />
            </Pressable>
          )}

          <Text style={styles.FooterText}>{currentSoundName}</Text>
        </>
      )}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  FooterContainer: {
    backgroundColor: COLORS.bg,
    width: windowWidth,
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.white,
  },
  FooterText: {
    fontFamily: FONTS.ae_Khalid,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
});
