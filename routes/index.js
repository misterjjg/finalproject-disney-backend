const router = require("express").Router();
const user = require("./user");
const articles = require("./articles");
const { createUser, signin } = require("../controllers/user");
const { validateUser, validateSignin } = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/articles", articles);
router.use("/users", user);

router.post("/signup", validateUser, createUser);
router.post("/signin", validateSignin, signin);

router.use(() => {
  throw new NotFoundError("Requested route not found");
});

module.exports = router;
