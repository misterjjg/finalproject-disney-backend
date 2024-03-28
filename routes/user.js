const router = require("express").Router();
const { getUser } = require("../controllers/user");
const auth = require("../middlewares/authorization");

router.get("/me", auth, getUser);

module.exports = router;
