/* eslint-disable linebreak-style */
import {
  createPost, getPost, getAllPosts, getPostsByTag, getPostsByCategory, updatePost, deletePost, createComment,
} from '../controllers/blogpost';
import { addSubscriber, getAllSubscribers } from '../controllers/subscriber';
import { updateProfile, getProfile } from '../controllers/userprofile';
import { gAnalytics } from '../controllers/analytics';

const authController = require('../controllers').users;
const draftController = require('../controllers').blogdraft;
const authMiddleware = require('../middlewares/auth');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the  Beenah API!',
  }));

  app.get('/api/analytics', gAnalytics);

  app.post('/api/login', authController.login);
  app.put('/api/user', updateProfile);
  app.get('/api/user', getProfile);
  // app.post('/api/register', authController.register);
  // app.get('/api/users', authController.userList);

  // Drafts routes
  app.post('/api/draft', draftController.createDraft);
  app.get('/api/draft/:id', draftController.getDraft);
  app.put('/api/draft/:id', draftController.updateDraft);
  app.delete('/api/draft/:id', draftController.deleteDraft);
  app.get('/api/draft', draftController.getAllDrafts);

  // Posts routes
  app.get('/api/post', getAllPosts);
  app.post('/api/post', createPost);
  app.get('/api/post/:id', getPost);
  app.get('/api/posts/tags/:tag', getPostsByTag);
  app.get('/api/posts/categories/:category', getPostsByCategory);
  app.put('/api/post/:id', updatePost);
  app.delete('/api/post/:id', deletePost);

  // Subscriber routes
  app.get('/api/subscribers', getAllSubscribers);
  app.post('/api/subscribers', addSubscriber);

  // Comment routes
  app.post('/api/comment', createComment);

  app.get('/api/checkToken', authMiddleware.checkAuth, (req, res) => {
    res.sendStatus(200);
  });
};
