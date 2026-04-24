const { Router } = require('express')
const authController = require('../controllers/app.controller')
const authmiddleware = require('../middlewares/auth.middleware')


const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController)
/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login', authController.loginUserController)

/**
 * @route GET/api/auth/logout
 * @desc Clear token from cookie and blacklist the token for logout
 * @access Public
 */
authRouter.get('/logout', authController.logoutUserController)

/**
 * @route GET/api/auth/get-me
 * @desc Get the current user loged in details
 * @access Private
 */

authRouter.get('/get-me', authmiddleware.authUser, authController.getMeController) 


module.exports = authRouter