const { Router } = require("express")
const { auth } = require('../middleware/auth')
const { userSignup } = require('../controllers/signupController')
const { userLogin } = require('../controllers/loginController')
const { userLogout } = require('../controllers/logoutController')


const userRouter = Router();


userRouter.post("/api/signup", userSignup)
userRouter.post("/api/login", userLogin)
userRouter.get("/api/logout", auth, userLogout)


module.exports = userRouter;