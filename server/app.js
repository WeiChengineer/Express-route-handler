// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/artists/latest/albums', (req, res) => {
  const albumsForLatestArtist = getAlbumsForLatestArtist();
  return res.status(200).json(albumsForLatestArtist);
});

app.get('/artists/latest', (req, res) => {
  const latestArtist = getLatestArtist();
  return res.status(200).json(latestArtist);
});

app.get('/artists/:artistId/songs', (req, res) => {
  const songs = getSongsByArtistId(req.params.artistId);
  return res.status(200).json(songs);
});

app.get('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const artist = getArtistByArtistId(artistId);
  return res.status(200).json(artist);
})

app.put('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const artistExists = getArtistByArtistId(artistId);

  if (!artistExists) {
    return res.status(404).json({ error: "Artist not found"});
  }
  const updatedArtist = editArtistByArtistId(artistId, req.body);
  return res.status(200).json(updatedArtist);
})

app.patch('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const artistExists = getArtistByArtistId(artistId);

  if (!artistExists) {
    return res.status(404).json({ error: "Artist not found"});
  }
  const updatedArtist = editArtistByArtistId(artistId, req.body);
  return res.status(200).json(updatedArtist);
})

app.get('/artists', (req, res) => {
  const artists = getAllArtists();
  return res.status(200).json(artists);
});

app.post('/artists', (req, res) => {
  const newArtist = addArtist(req.body);
  return res.status(201).json(newArtist)
});

app.delete('/artists/:artistId', (req, res) => {
  deleteArtistByArtistId(req.params.artistId);
  return res.status(200).json({ message: "Successfully deleted"});
});

app.get('/artists/:artistId/albums', (req, res) => {
  const albums = getAlbumsByArtistId(req.params.artistId);
  return res.status(200).json(albums);
})

app.post('/artists/:artistId/albums', (req, res) => {
  const newAlbum = addAlbumByArtistId(req.params.artistId, req.body);
  return res.status(201).json(newAlbum);
});

app.post('/albums/:albumId/songs', (req, res) => {
  const newSong = addSongByAlbumId(req.params.albumId, req.body);
  return res.status(201).json(newSong);
});

app.get('/albums/:albumId', (req, res) => {
  const album = getAlbumByAlbumId(req.params.albumId);
  return res.status(200).json(album);
})

app.put('/albums/:albumId', (req, res) => {
  const updatedAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
  return res.status(200).json(updatedAlbum);
});

app.patch('/albums/:albumId', (req, res) => {
  const updatedAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
  return res.status(200).json(updatedAlbum);
});

app.delete('/albums/:albumId', (req, res) => {
  deleteAlbumByAlbumId(req.params.albumId);
  return res.status(200).json({ message: "Successfully deleted"});
});

app.get('/albums', (req, res) => {
  const albums = getFilteredAlbums(req.query.startsWith);
  return res.status(200).json(albums);
});

app.get('/songs/:songId', (req, res) => {
  const song = getSongBySongId(req.params.songId);
  return res.status(200).json(song);
});

app.get('/albums/:albumId/songs', (req, res) => {
  const songs = getSongsByAlbumId(req.params.albumId);
  return res.status(200).json(songs);
});

app.put('/songs/:songId', (req, res) => {
  const updatedSong = editSongBySongId(req.params.songId, req.body);
  return res.status(200).json(updatedSong);
});

app.patch('/songs/:songId', (req, res) => {
  const updatedSong = editSongBySongId(req.params.songId, req.body);
  return res.status(200).json(updatedSong);
});

app.delete('/songs/:songId', (req, res) => {
  deleteSongBySongId(req.params.songId);
  return res.status(200).json({ message: "Successfully deleted"});
});



// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}