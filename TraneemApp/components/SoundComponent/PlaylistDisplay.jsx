import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import SoundsDisplay from "./SoundsDisplay";
import { COLORS, FONTS, SIZES } from "@/constants/Theme";

const PlaylistDisplay = (props) => {
  const [Playlist_Data, setPlaylist_Data] = useState(null);
  const [sounds, setSounds] = useState(null);
  const playlist_id = props.playlist_id;

  useFocusEffect(
    useCallback(() => {
      const data = axios
        .get(`http://192.168.1.9:3000/api/playlists/${playlist_id}`)
        .then((response) => {
          setPlaylist_Data(response.data[0]);
        });

      const sounds = axios
        .get(`http://192.168.1.9:3000/api/playlists/${playlist_id}/sound`)
        .then((response) => {
          setSounds(response.data[0]);
        });
    }, [playlist_id])
  );

  return (
    <>
      {Playlist_Data ? (
        <>
          <Text style={styles.header}> {Playlist_Data.playlist_name} </Text>

          <SoundsDisplay category_id={"playlists"} playlist_id = {playlist_id} />

        </>
      ) : null}
    </>
  );
};

export default PlaylistDisplay;

const styles = StyleSheet.create({
    header: {
        fontSize: SIZES.xLarge,
        textAlign: "center",
        fontFamily: FONTS.ae_Khalid
    },
});
