import express from "express";
import {getAllArticles, getOneArticle, updateOneArticle, deleteOneArticle, postManyArticles, deleteManyArticles, postOneArticle} from '../controllers/articleControllers.js'

const articlesRouter = express.Router();

articlesRouter
  .route("/")
  .get(getAllArticles)
  .delete(deleteManyArticles)
  .post(postManyArticles);
articlesRouter
  .route("/one")
  .post(postOneArticle);

articlesRouter
  .route("/:id")
  .get(getOneArticle)
  .put(updateOneArticle)
  .delete(deleteOneArticle);

export default articlesRouter;
