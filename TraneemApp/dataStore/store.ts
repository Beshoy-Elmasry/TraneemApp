import { create } from 'zustand'
import { Audio } from 'expo-av';

type State = {
  data: object[]; // Array of objects from API response
  playlists: object[]; // Array of objects from API response
  sound: Audio.Sound | null; // Audio object for currently playing sound
  status: object[]; // Array of objects from API response
  soundisPlaying: boolean;
  soundId: number | null; // ID of currently playing sound
  favoritedSounds: object[]; // Array of objects for favorited sounds
};

type Action = {
  setData: (data: State['data']) => void;
  setPlaylists: (data: State['playlists']) => void;
  setSound: (sound: State['sound']) => void;
  setStatus: (sound: State['sound']) => void;
  setSoundIsPlaying: (soundisPlaying: State['soundisPlaying']) => void;
  setSoundID: (soundId: State['soundId']) => void;
  setFavoritedSounds: (favoritedSounds: State['favoritedSounds']) => void;
};


// Create your store, which includes both state and (optionally) actions
const useSoundStore = create<State & Action>((set) => ({
  data: [],
  playlists: [],
  sound: null,
  soundisPlaying: false,
  soundId: null,
  favoritedSounds: [],
  setData: (data) => set(() => ({ data })),
  setPlaylists: (playlists) => set(() => ({ playlists })),
  setSound: (sound) => set(() => ({ sound })),
  setStatus: (status) => set(() => ({ status })),
  setSoundIsPlaying: (soundisPlaying) => set(() => ({ soundisPlaying })),
  setSoundID: (soundId) => set(() => ({ soundId })),
  setFavoritedSounds: (favoritedSounds) => set(() => ({ favoritedSounds })),
}));

export default useSoundStore;