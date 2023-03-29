import express from "express";

import { getAllEditors, signupEditor, loginEditor } from '../controllers/editorControllers.js';

const editorsRouter = express.Router();

editorsRouter
  .route("/")
  .get(getAllEditors)
  .post(signupEditor);
// .delete(deleteEditor);

editorsRouter
  .route("/:id")
  .get(loginEditor);
// .put(updateEditor)
// .delete(deleteEditor);

export default editorsRouter;


