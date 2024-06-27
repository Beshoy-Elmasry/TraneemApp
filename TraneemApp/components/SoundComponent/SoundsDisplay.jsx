import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useCallback, useRef, useEffect, useState } from "react";
import useSoundStore from "@/dataStore/store";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import {
  COLORS,
  FONTS,
  SIZES,
  windowHeight,
  windowWidth,
} from "@/constants/Theme";
import { Ionicons, MaterialIcons , MaterialCommunityIcons } from "@expo/vector-icons";
import { playSound } from "./SoundOperations";
import Footer from "./Footer";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Modal from "react-native-modal";

const SoundsDisplay = (props) => {
  const category_id = props.category_id;
  const category_name = props.category_name;
  const intervalRef = useRef(null);

  const data = useSoundStore((state) => state.data);
  const setData = useSoundStore((state) => state.setData);

  const playlists = useSoundStore((state) => state.playlists);
  const setPlaylists = useSoundStore((state) => state.setPlaylists);

  const sound = useSoundStore((state) => state.sound);
  const setSound = useSoundStore((state) => state.setSound);

  const status = useSoundStore((state) => state.status);
  const setStatus = useSoundStore((state) => state.setStatus);

  const soundisPlaying = useSoundStore((state) => state.soundisPlaying);
  const setSoundIsPlaying = useSoundStore((state) => state.setSoundIsPlaying);

  const soundId = useSoundStore((state) => state.soundId);
  const setSoundID = useSoundStore((state) => state.setSoundID);

  const favoritedSounds = useSoundStore((state) => state.favoritedSounds);
  const setFavoritedSounds = useSoundStore((state) => state.setFavoritedSounds);

  const [isModalVisible, setModalVisible] = useState(false);
  const [Checked, setChecked] = useState(null);
  const [soundChecked, setSoundChecked] = useState(null);
  const [playlist_name, setPlayListName] = useState(null);

  const playlist_id = props.playlist_id;

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        let data;
        if (category_id === "playlists") {
          data = await axios.get(
            `http://192.168.1.9:3000/api/${category_id}/${playlist_id}/sound`
          );
        } else {
          data = await axios.get(
            `http://192.168.1.9:3000/api/data/${category_id}`
          );
        }
        setData(data.data);
        if (category_id === "favorite") {
          setFavoritedSounds(data.data);
        }
      };
      getData();
    }, [category_id, favoritedSounds])
  );

  useEffect(() => {
    const getPlayLists = async () => {
      const data = await axios.get(`http://192.168.1.9:3000/api/playlists`);
      setPlaylists(data.data);
    };
    getPlayLists();
    console.log(playlists.length);
  }, [isModalVisible]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const toggleModal = (id) => {
    setModalVisible(!isModalVisible);
    setSoundChecked(id);
    console.log(isModalVisible);
  };

  const handleChecked = (id) => {
    setChecked(id);
  };

  const AddSoundToPlayList = async (sound_id) => {
    const request = await axios.post(
      `http://192.168.1.9:3000/api/data/playlists/add-sound-to-playlist/${Checked}`,
      {
        category_id: category_id,
        sound_id: sound_id,
        playlist_id: Checked,
      }
    );
  };

  const ModalViewer = (sound_id) => {
    return (
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        deviceHeight={windowHeight}
        deviceWidth={windowWidth}
        // useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        style={styles.modal}
      >
        <View style={styles.modal_container}>
          <View style={styles.swipeIndicator} />
          {/* <Text style={styles.modal_title}>{category_name}</Text>
          <Text style={styles.modal_text}>{category_name}</Text> */}
          {playlists.length !== 0 ? (
            <>
              <FlatList
                data={playlists}
                renderItem={(item) => {
                  return (
                    <Pressable
                      style={styles.container}
                      onPress={() => handleChecked(item.item.id)}
                    >
                      {Checked === item.item.id ? (
                        <Ionicons
                          name="checkmark-circle-sharp"
                          size={24}
                          color="green"
                        />
                      ) : (
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={24}
                          color="green"
                        />
                      )}

                      <Text> {item.item.playlist_name} </Text>
                    </Pressable>
                  );
                }}
              />
              <View style={styles.AddPlaylist}>
                <Ionicons name="add" size={24} color="black" />
                <Pressable onPress={() => AddSoundToPlayList(soundChecked)}>
                  <Text style={styles.modal_text}> اضف الي قائمه التشغيل </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.modal_title}>
                لأسف انت لا تملك قائمه تشغيل يمكنك انشاء واحده
              </Text>
              <TextInput
                placeholder="اكتب اسم لقائمه التشغيل"
                onChangeText={setPlayListName}
                style={styles.input}
                value={playlist_name}
              />
              <View style={styles.AddPlaylist}>
                <Ionicons name="add" size={24} color="black" />
                <Pressable onPress={() => AddPlayList(playlist_name)}>
                  <Text style={styles.modal_text}> انشاء قائمه تشغيل </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </Modal>
    );
  };

  const AddPlayList = async () => {
    const data = await axios.post(
      `http://192.168.1.9:3000/api/data/playlists/create-playlist`,

      {
        playlist_name: playlist_name,
      }
    );
    setPlaylists(data.data);
  };

  const UpdataFavorited = async (favorite, soundid) => {
    // console.log("FAV: " + favorite);
    // console.log(soundid);
    const req = axios
      .patch(
        `http://192.168.1.9:3000/api/data/${category_id}/sound/${soundid}/favorite`,
        {
          favorite: favorite,
        }
      )
      .then((response) => {
        setFavoritedSounds(response.data[0]);
      });
  };

  return (
    <View style={styles.sounds_container}>
      {data ? (
        <>
          <FlatList
            data={data}
            renderItem={(item) => {
              return (
                <Pressable
                  onPress={() =>
                    playSound(
                      item.item.category_path,
                      item.item.sound_fileName,
                      setSound,
                      sound,
                      setSoundID,
                      status,
                      setStatus,
                      setSoundIsPlaying,
                      intervalRef,
                      item.item.id
                    )
                  }
                >
                  <View style={styles.sound_Container}>
                    <Menu>
                      <MenuTrigger>
                        <Ionicons
                          name="ellipsis-vertical-sharp"
                          size={24}
                          color="black"
                          style={styles.menuIcon}
                        />
                      </MenuTrigger>
                      <MenuOptions
                        customStyles={{
                          optionsContainer: {
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 5,
                            marginTop: 28,
                            marginLeft: 20
                          },
                          optionsWrapper: {
                            backgroundColor: "white",
                            borderRadius: 8,
                          },
                          optionWrapper: {
                            padding: 10,
                          },
                        }}
                      >
                        <MenuOption
                          onSelect={() =>
                            UpdataFavorited(item.item.favorited, item.item.id)
                          }
                        >
                          {item.item.favorited === "false" ? (
                            <View style={styles.MenuOption}>
                              <MaterialIcons
                                name={"favorite-outline"}
                                // color={COLORS.black}
                                size={SIZES.IconSize}
                                style={{
                                  color: "#000",
                                }}
                              />
                              <Text style={styles.menuOptionText}>
                                اضافة الي المفضلة
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.MenuOption}>
                              <MaterialIcons
                                name={"favorite"}
                                // color={COLORS.black}
                                size={SIZES.IconSize}
                                style={{
                                  color: "#000",
                                }}
                              />
                              <Text style={styles.menuOptionText}>
                                ازالة من المفضلة
                              </Text>
                            </View>
                          )}
                        </MenuOption>
                        <MenuOption onSelect={() => toggleModal(item.item.id)}>
                          <View style={styles.MenuOption}>
                            <MaterialCommunityIcons
                              name={"playlist-music"}
                              size={SIZES.IconSize}
                              style={{
                                color: "#000",
                              }}
                            />
                            <Text style={styles.menuOptionText}>
                              اضف الي قائمه تشغيل
                            </Text>
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                    <Text style={styles.text}>{item.item.sound_name}</Text>
                  </View>
                </Pressable>
              );
            }}
          />

          <Footer
            soundId={soundId}
            category_id={category_id}
            soundisPlaying={soundisPlaying}
            playlist_id={playlist_id}
          />
          <ModalViewer sound_id={soundChecked} />
        </>
      ) : null}
    </View>
  );
};

export default SoundsDisplay;

const styles = StyleSheet.create({
  sounds_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth,
    height: windowHeight,
    marginVertical: 25,
  },
  sound_Container: {
    backgroundColor: COLORS.white,
    width: windowWidth,
    padding: 10,
    marginBottom: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontFamily: FONTS.ae_Khalid,
    fontSize: SIZES.xLarge,
    textAlign: "center",
  },
  menuIcon: {
    padding: 5,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modal_container: {
    height: windowHeight / 2,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  swipeIndicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  modal_title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
  modal_text: {
    fontSize: SIZES.small,
  },
  AddPlaylist: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: windowWidth - 50,
    backgroundColor: COLORS.bg,
    marginBottom: 15,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
    borderRadius: 8,
  },
  MenuOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
