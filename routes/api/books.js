const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/books");
const { addBookSchema, updateRatingBookSchema } = require("../../models/books");
const { validateBody, isValidToken, isValidId } = require("../../middlewares");

router.get("/", isValidToken, ctrl.getAllUserBook);
router.get("/:bookId", isValidToken, isValidId, ctrl.getBookById);
router.post("/", isValidToken, validateBody(addBookSchema), ctrl.addBook);
router.delete("/:bookId", isValidId, ctrl.deleteBook);
router.put(
  "/:bookId",
  isValidId,
  validateBody(updateRatingBookSchema),
  ctrl.addRatingBook
);
router.patch("/:bookId", isValidId, ctrl.updateStatusBook);

module.exports = router;
