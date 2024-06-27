const { json } = require("express");
const knex = require("./knex");

function getAllCategories() {
  return knex("soundCategory").select("*");
}

function getSoundsIN_category(category_id) {
  return knex("sound").where("sound_category", category_id).select("*");
}

function getAllSingers() {
  return knex("singer").select("*");
}

function getAuthor_Sounds(singer_id) {
  return knex("sound").where("author_id", singer_id).select("*");
}

async function get_Specific_Sound(category, id) {
  console.log("CATE: " + category);
  console.log("ID: " + id);
  try {
    if (category != "favorite") {
      console.log(
        await knex("sound")
          .where("sound_category", category)
          .where("id", id)
          .select("*")
      );
      return await knex("sound")
        .where("sound_category", category)
        .where("id", id)
        .select("*");
    } else if (category === 'favorite') {
      return await knex("sound")
      .where("favorited", (value = "true"))
      .where("id", id)
      .select("*");
    } else {
      return { error: "Wrong" };
    }
    
  } catch (error) {
    console.log(error);
  }
}

async function getSpecificFavorite_Sound(category, id, state) {
  const fav_sounds = await knex("sound")
    .where("favorited", (value = "true"))
    .select("*");
    console.log(category);
    console.log(id);
  const current_sound = await get_Specific_Sound(category, id);
  console.log(current_sound);
  // console.log("FAV: " + fav_sounds);
  // console.log("cuurent_SOUND: " + current_sound);
  // const current_sound_index = fav_sounds.indexOf(current_sound)
  const getCurrentSoundIndex = (sound) => sound.id == id;
  const current_sound_index = fav_sounds.findIndex(getCurrentSoundIndex);
  // console.log("current_SOUND_INDEX: " + current_sound_index);
  // console.log(state);
  if (state === "next") {
    const next_favSound_index = current_sound_index + 1;
    const next_favSound = fav_sounds[next_favSound_index];

    return next_favSound;
  } else if (state === "previous") {
    const previous_favSound_index = current_sound_index - 1;
    const previous_favSound = fav_sounds[previous_favSound_index];

    return previous_favSound;
  } else {
    return current_sound
  }
}

async function updateFavorited(id, favorite) {
  // try {
  console.log(favorite);
    return await knex("sound")
      .where("id", id)
      .update(
        {
          favorited: favorite === 'true' ? "false" : 'true',
        } , 
        // ["id", "favorited"]
      );
  // } catch (error) {
  //   throw error; // Re-throw for handling in the API endpoint
  // }
}

// async function updateFavoritedTO_false(id) {
//   try {
//     return await knex("sound").where("id", id).update(
//       {
//         favorited: "false",
//       },
//       ["id", "favorited"]
//     );
//   } catch (error) {
//     throw error; // Re-throw for handling in the API endpoint
//   }
// }

async function get_Favorited_Sounds() {
  return await knex("sound")
    .where("favorited", (value = "true"))
    .select("*");
}

async function createPlaylist(playList_name) {
  try {
    // Insert a new playlist
    await knex("playlist").insert({
      playlist_name: playList_name,
      // playlist_sounds: [] // Initialize with an empty string or array as needed
    });

    return { success: true, message: "Playlist created successfully" };
  } catch (error) {
    throw error; // Re-throw for handling in the API endpoint
  }
}

async function addSoundToPlaylist(playlist_id, sound_id, category_id) {
  // try {
  // Fetch the existing playlist by name
  const playlist = await knex("playlist").where({ id: playlist_id }).first();

  // console.log("PLAYLIST: " + playlist);

  if (!playlist) {
    throw new Error(`Playlist with name ${playlist_id} does not exist`);
  }

  const sound = await get_Specific_Sound(category_id, sound_id);

  const JsonSound = JSON.stringify(sound[0]);

  // console.log("SOUND: " + sound[0]);

  // Update the playlist_sounds for the existing playlist
  await knex("playlist")
    .where({ id: playlist_id })
    .update({
      playlist_sounds: playlist.playlist_sounds
        ? `${playlist.playlist_sounds},${JsonSound}`
        : JsonSound,
    });

  await knex("sound").where({ id: sound_id }).update({
    playlist_id: playlist_id,
  });

  return { success: true, message: "Sound added to playlist successfully" };
  // } catch (error) {
  //   throw error; // Re-throw for handling in the API endpoint
  // }
}

async function get_Playlists() {
  return await knex("playlist").select("*");
}

async function get_Playlist(id) {
  return await knex("playlist").where("id", id).select("*");
}

async function get_Sounds_IN_Playlist(playlist_id) {
  // const playlist = await knex('playlist').where("id" , playlist_id).select("*");
  return await knex("sound").where({ playlist_id: playlist_id }).select("*");
}

async function get_Sound_IN_Playlist(playlist_id, soundId) {
  return await knex("sound")
    .where({ playlist_id: playlist_id, id: soundId })
    .select("*");
}

module.exports = {
  getAllCategories,
  getSoundsIN_category,
  get_Specific_Sound,
  getAllSingers,
  getAuthor_Sounds,
  updateFavorited,
  // updateFavoritedTO_true,
  // updateFavoritedTO_false,
  get_Favorited_Sounds,
  getSpecificFavorite_Sound,
  createPlaylist,
  addSoundToPlaylist,
  get_Playlists,
  get_Playlist,
  get_Sounds_IN_Playlist,
  get_Sound_IN_Playlist,
};
