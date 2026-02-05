const express = require('express');
const { nanoid } = require('nanoid');
const AlbumsService = require('../services/AlbumsService');
const AlbumsValidator = require('../validators/albumsValidator');
const router = express.Router();
const service = new AlbumsService();

router.get('/', async (req, res) => {
  const albums = await service.getAlbums();

  res.json({
    status: 'success',
    data: { albums },
  });
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const album = await service.getAlbumById(id);

  res.json({
    status: 'success',
    data: { album },
  });
});



router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    AlbumsValidator.validateAlbumPayload(req.body);
    const { name, year } = req.body;

    await service.updateAlbumById(id, { name, year });

    res.json({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await service.deleteAlbumById(id);

  res.json({
    status: 'success',
    message: 'Album berhasil dihapus',
  });
});



router.post('/', async (req, res, next) => {
  try {
    AlbumsValidator.validateAlbumPayload(req.body);
    const { name, year } = req.body;

    const id = `album-${nanoid(16)}`;

    const albumId = await service.addAlbum({
      id,
      name,
      year,
    });

    res.status(201).json({
      status: 'success',
      data: {
        albumId,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
