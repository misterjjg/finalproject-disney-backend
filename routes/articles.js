const router = require("express").Router();
const {
  getSavedArticles,
  createSavedArticle,
  deleteSavedArticle,
} = require("../controllers/articles");
const auth = require("../middlewares/authorization");
const { validateId, validateNewsItem } = require("../middlewares/validation");

router.get("/", auth, getSavedArticles);
router.post("/", auth, validateNewsItem, createSavedArticle);
router.delete("/:articleId", auth, validateId, deleteSavedArticle);

module.exports = router;
