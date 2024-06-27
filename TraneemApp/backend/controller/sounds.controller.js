const db = require("../db/soundsOperations");

const getAllCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.json(categories);
};

const get_Favorited_Sounds = async (req, res) => {
  const favoriteSounds = await db.get_Favorited_Sounds();
  res.json(favoriteSounds);
};

const getSpecificFavorite_Sound = async (req, res) => {
  const category = "favorite";
  // console.log("STATE: " + req.params.state);
  const sound = await db.getSpecificFavorite_Sound(
    category,
    req.params.sound_id,
    // req.params.state
  );
  console.log("FINAL_TEST: " + sound.id);
  res.json(sound);
};

const get_Specific_Sound = async (req, res) => {
  const sound = await db.get_Specific_Sound(
    req.params.category_id,
    req.params.sound_id
  );
  res.json(sound);
};

const getSoundsIN_category = async (req, res) => {
  const sounds = await db.getSoundsIN_category(req.params.category_id);
  res.json(sounds);
};

const getAllSingers = async (req, res) => {
  const singers = await db.getAllSingers();
  res.json(singers);
};

const getAuthor_Sounds = async (req, res) => {
  const sounds = await db.getAuthor_Sounds(req.params.author_id);
  res.json(sounds);
};

const updateFavorited = async (req, res) => {
  try {
    // console.log("CAT_CAT: " + req.params.category_id);
    const favorite = req.body["favorite"]; // Extract favorite from request body
    await db.updateFavorited(req.params.sound_id, favorite);
    const sounds = await db.getSoundsIN_category(req.params.category_id);
    res.json(sounds);
    // res.status(200).json({ message: 'Sound favorited successfully!', fav });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating favorite" });
  }
};

// const updateFavoritedTO_true = async (req, res) => {
//   try {
//     console.log("CAT_CAT: " + req.params.category_id);
//     const favorite = req.body.favorite; // Extract favorite from request body
//     await db.updateFavoritedTO_true(req.params.sound_id, favorite);
//     const sounds = await db.getSoundsIN_category(req.params.category_id);
//     res.json(sounds);
//     // res.status(200).json({ message: 'Sound favorited successfully!', fav });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating favorite" });
//   }
// };

// const updateFavoritedTO_false = async (req, res) => {
//   try {
//     console.log("CAT_CAT: " + req.params.category_id);
//     await db.updateFavoritedTO_false(req.params.sound_id);
//     let sounds;
//     if (req.params.category_id === "favorite") {
//       sounds = await db.get_Favorited_Sounds();
//     } else {
//       sounds = await db.getSoundsIN_category(req.params.category_id);
//     }
//     res.json(sounds);
//     // res.status(200).json({ message: 'Sound UNfavorited successfully!', fav });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating favorite" });
//   }
// };

const CreatePLayList = async (req, res) => {
  const  playList_name   = req.body["playlist_name"]
  try {
    const result = await db.createPlaylist(playList_name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const addSoundToPlaylist = async (req, res) => {
  const { playlist_id, sound_id , category_id } = req.body;

  try {
    const result = await db.addSoundToPlaylist(playlist_id, sound_id , category_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const get_Playlists = async (req , res) => {
  const playlists = await db.get_Playlists();
  return res.json(playlists);
}

const get_Playlist = async (req , res) => {
  const playlist_id = req.params.playlist_id;
  const playlist = await db.get_Playlist(playlist_id);
  return res.json(playlist);
}

const get_Sounds_IN_Playlist = async (req , res) => {
  const playlist_id = req.params.playlist_id;
  const sounds = await db.get_Sounds_IN_Playlist(playlist_id);
  return res.json(sounds);
}

const get_Sound_IN_Playlist = async (req , res) => {
  const {playlist_id , soundId} = req.params;
  const sounds = await db.get_Sound_IN_Playlist(playlist_id , soundId);
  return res.json(sounds);
}

exports.controller = {
  getAllCategories,
  get_Favorited_Sounds,
  getSpecificFavorite_Sound,
  get_Specific_Sound,
  getSoundsIN_category,
  getAllSingers,
  getAuthor_Sounds,
  updateFavorited,
  // updateFavoritedTO_true,
  // updateFavoritedTO_false,
  CreatePLayList,
  addSoundToPlaylist,
  get_Playlists,
  get_Playlist,
  get_Sounds_IN_Playlist,
  get_Sound_IN_Playlist
};
