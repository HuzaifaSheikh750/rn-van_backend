const { register, login } = require('../Controllers/AuthController');
const { checkUser } = require('../Middlewares/Authmiddlewares');

const router = require('express').Router();

router.post("/", checkUser)
router.post("/register", register)
router.post("/login", login)

module.exports = router;