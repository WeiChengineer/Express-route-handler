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

app.get('/albums/:albumId', (req, res) => {
  const album = getAlbumByAlbumId(req.params.albumId);
  return res.status(200).json(album);
})

app.post('/artists/:artistId/albums', (req, res) => {
  const newAlbum = addAlbumByArtistId(req.params.artistId, req.body);
  res.status(201).json(newAlbum);
});

app.put('/albums/:albumId', (req, res) => {
  const updatedAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
  res.status(200).json(updatedAlbum);
});



// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}