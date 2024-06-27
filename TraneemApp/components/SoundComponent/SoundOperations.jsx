import useSoundStore from "@/dataStore/store";
import { Audio } from "expo-av";

export const playSound = async (
  cat_path,
  fileName,
  setSound,
  sound,
  setSoundID,
  status,
  setStatus,
  setSoundIsPlaying,
  intervalRef,
  id
) => {
  const audioContext = require.context("../../backend/db/sounds", true);
  const audioPath = await audioContext(`./${cat_path}/${fileName}.mp3`); // Use template literal for clarity

  setSoundID(id);

  try {
    const { sound } = await Audio.Sound.createAsync(audioPath, {
      shouldPlay: "true",
    });
    setSound(sound);
    console.log("Playing Sound");

    await sound.playAsync();

    const updateStatus = async () => {
      const status = await sound.getStatusAsync();
      setStatus(status);
      setSoundIsPlaying(status.isPlaying);
    };

    intervalRef.current = setInterval(updateStatus, 500);

    sound.setOnPlaybackStatusUpdate(async (status) => {
      setStatus(status);
      setSoundIsPlaying(status.isPlaying);

      if (!status.isPlaying) {
        clearInterval(intervalRef.current);
      }
    });
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};

export const SoundState = async (sound, soundisPlaying, setSoundIsPlaying) => {
  if (soundisPlaying === true) {
    sound.pauseAsync();
    setSoundIsPlaying(false);
    
  } else if (soundisPlaying == false && sound != null) {
    sound.playAsync();
    setSoundIsPlaying(true);
  }
};
