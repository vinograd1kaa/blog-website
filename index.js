import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import { UserController, PostController, CommentController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { commentCreateValidation, loginValidation, postCreateValidation, registerValidation } from "./validations/index.js";

mongoose
  .connect('mongodb+srv://admin:qweasd@cluster1.xkld23a.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => { // когда создается хранилище выполняется функция
    cb(null, 'uploads'); // она не получает никаких ошибок, файлы сохраняются в uploads
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage });

app.use(express.json()) // позволяет читать json который приходит в запросах
app.use(cors());
app.use('/uploads', express.static('uploads')); // объясняем express про гет запрос на получении статичного файла localhost:444/uploads/<img>

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
});

app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/tag/:tag', PostController.getPostsByTag);

app.get('/posts', PostController.getAll);
app.get('/posts/popularity', PostController.getAllPopularity);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, handleValidationErrors, PostController.update);

app.get('/comments', CommentController.getLastComments);
app.delete('/comments', CommentController.remove);
app.patch('/comments/:id', CommentController.update);
app.get('/comments/:postId', CommentController.getPostComments);
app.post('/comments/:postId', checkAuth, commentCreateValidation, handleValidationErrors, CommentController.create);


app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})