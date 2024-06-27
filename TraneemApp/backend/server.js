const express = require("express");
const app = express();
const cors = require("cors");
const { controller } = require("./controller/sounds.controller");
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.use(cors()); // Enable CORS for React Native app to access server
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method + "  " + req.url);
  next();
});

app.get("/api/data/", controller.getAllCategories);

app.get("/api/data/favorite", controller.get_Favorited_Sounds);

app.get("/api/data/favorite/sound/:sound_id/:state" , controller.getSpecificFavorite_Sound);

app.get("/api/data/:category_id", controller.getSoundsIN_category);

app.get("/api/data/:category_id/singers", controller.getAllSingers);

app.get("/api/data/:category_id/:author_id", controller.getAuthor_Sounds);

app.get("/api/data/:category_id/sound/:sound_id", controller.get_Specific_Sound);

app.patch("/api/data/:category_id/sound/:sound_id/favorite", controller.updateFavorited);

// app.patch("/api/data/:category_id/sound/:sound_id/true", controller.updateFavoritedTO_true);

// app.patch("/api/data/:category_id/sound/:sound_id/false", controller.updateFavoritedTO_false);

app.get("/api/playlists" , controller.get_Playlists)

app.get("/api/playlists/:playlist_id" , controller.get_Playlist)

app.get("/api/playlists/:playlist_id/sound" , controller.get_Sounds_IN_Playlist)

app.get("/api/playlists/:playlist_id/sound/:soundId" , controller.get_Sound_IN_Playlist)

app.post('/api/data/playlists/create-playlist', controller.CreatePLayList);

app.post('/api/data/playlists/add-sound-to-playlist/:playlist_id', controller.addSoundToPlaylist);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
