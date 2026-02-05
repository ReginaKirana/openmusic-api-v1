const express = require('express');
const { nanoid } = require('nanoid');
const SongsService = require('../services/SongsService');

const SongsValidator = require('../validators/songsValidator');

const router = express.Router();
const service = new SongsService();

router.post('/', async (req, res, next) => {
  try {
    SongsValidator.validateSongPayload(req.body);
    const { title, year, performer, genre, duration, albumId } = req.body;

    const id = `song-${nanoid(16)}`;

    const songId = await service.addSong({
      id,
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    });

    res.status(201).json({
      status: 'success',
      data: { songId },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res) => {
  const { title, performer } = req.query;
  const songs = await service.getSongs(title, performer);

  res.json({
    status: 'success',
    data: { songs },
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await service.getSongById(id);

    res.json({
      status: 'success',
      data: { song },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    SongsValidator.validateSongPayload(req.body);
    const { title, year, performer, genre, duration, albumId } = req.body;

    await service.updateSongById(id, {
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    });

    res.json({
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await service.deleteSongById(id);

    res.json({
      status: 'success',
      message: 'Lagu berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
