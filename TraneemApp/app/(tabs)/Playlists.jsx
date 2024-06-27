import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "@/components/header/Header";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import { COLORS, FONTS, SIZES, windowWidth } from "@/constants/Theme";
import PlaylistDisplay from "@/components/SoundComponent/PlaylistDisplay";

const Playlist = () => {
  const [data, setData] = useState(null);
  const [playlist, setPlaylist] = useState(false);
  const [playlist_id, setPlaylist_id] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setPlaylist(false)
      const getPlayLists = async () => {
        const data = axios
          .get(`http://192.168.1.9:3000/api/playlists`)
          .then((respones) => {
            setData(respones.data);
            console.log(respones.data);
          });
      };
      getPlayLists();
    }, [])
  );

  const RenderPLayList = (id) => {
    setPlaylist_id(id);
    setPlaylist(true);
  };

  return (
    <>
      <Header category_name={"قوائم التشغيل"} />

      {playlist ? (
        <PlaylistDisplay playlist_id={playlist_id}/>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={(item) => {
              return (
                <View style={styles.playlist_container}>
                  <Pressable onPress={() => RenderPLayList(item.item.id)}>
                    <Text style={styles.text}>{item.item.playlist_name}</Text>
                  </Pressable>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth,
    marginHorizontal: "auto",
    display: "flex",
    gap: 15,
    height: 'auto'
  },
  playlist_container: {
    backgroundColor: COLORS.white,
    width: windowWidth - 60,
    padding: 8,
    marginTop: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: SIZES.large,
    fontFamily: FONTS.ae_Khalid,
  },
});
