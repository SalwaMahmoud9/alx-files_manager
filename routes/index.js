import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  // Redis
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // number of users and files
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  // User Controller

  // new user
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  // retrieve  user
  router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
  });

  // Auth Controller

  // connect
  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  // disconnect
  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });

  // Files Controller

  // post file
  router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
  });

  // retrieve file
  router.get('/files/:id', (req, res) => {
    FilesController.getShow(req, res);
  });

  // retrieve all users
  router.get('/files', (req, res) => {
    FilesController.getIndex(req, res);
  });

  // set isPublic
  router.put('/files/:id/publish', (req, res) => {
    FilesController.putPublish(req, res);
  });

  // set isPublic
  router.put('/files/:id/unpublish', (req, res) => {
    FilesController.putUnpublish(req, res);
  });

  // return content of file
  router.get('/files/:id/data', (req, res) => {
    FilesController.getFile(req, res);
  });
}

export default controllerRouting;
