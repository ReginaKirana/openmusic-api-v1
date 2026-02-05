require('dotenv').config();
const express = require('express');
const albumsRoutes = require('./routes/album');
const app = express();
const songsRoutes = require('./routes/song');

app.use(express.json());
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);

const ClientError = require('./exceptions/ClientError');

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server kami',
  });
});

app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Resource not found'
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
