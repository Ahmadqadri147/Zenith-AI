const usermodel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model')


// this is register controller for handling user registration and we will also hash the password before saving it to the database and we will also generate a token for the user after successful registration and we will also set the token in the cookie so that we can access the token in the client side and we can also send the token in the response so that we can access the token in the client side and we can also use the token for authentication in the protected routes
/**
 * @name registerUserController
 * @description This controller will handle user registration and we will also hash the password before saving it to the database and we will also generate a token for the user after successful registration and we will also set the token in the cookie so that we can access the token in the client side and we can also send the token in the response so that we can access the token in the client side and we can also use the token for authentication in the protected routes
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' })
    }
    const isuseralreadyexists = await usermodel.findOne({ $or: [{ email }, { username }] })
    if (isuseralreadyexists) {
        return res.status(400).json({ message: 'Account already exists with this email or username' })
    }
    // package need to install bcryptjs for hashing password and jsonwebtoken for generating token for authentication and we also need to install cookie-parser for handling cookies in express
    const hash = await bcrypt.hash(password, 10)

    const user = await usermodel.create({
        username,
        email,
        password: hash
    })
    // vist jwt sercet.com to generate a secret key for signing the token and we will use that secret key to sign the token and we will also set an expiration time for the token so that the token will expire after a certain period of time and we will also set the token in the cookie so that we can access the token in the client side and we can also send the token in the response so that we can access the token in the client side and we can also use the token for authentication in the protected routes
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        }
        , process.env.JWT_SECRET, { expiresIn: '1h' }


    )
    res.cookie('token', token,)
    res.status(201).json({
        message: 'User registered successfully',
        user: { id: user._id, username: user.username, email: user.email }
    })

}

/**
 * @name loginUserController
 * @description This controller will handle user login and we will also compare the password with the hashed password in the database and we will also generate a token for the user after successful login and we will also set the token in the cookie so that we can access the token in the client side and we can also send the token in the response so that we can access the token in the client side and we can also use the token for authentication in the protected routes
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body
    const user = await usermodel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' })
    }
    const ispasswordcorrect = await bcrypt.compare(password, user.password)
    if (!ispasswordcorrect) {
        return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET, { expiresIn: '1h' }
    )
    res.cookie('token', token,)
    res.status(200).json({
        message: 'User logged in successfully',
        user: { id: user._id, username: user.username, email: user.email }
    })

}

/**
 * @name logoutUserController
 * @description This controller will handle user logout and we will also clear the token from the cookie and we will also blacklist the token for logout so that the token will not be valid for authentication in the protected routes
 * @access Public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token
    if (token) {
        await blacklistTokenModel.create({ token })
        res.clearCookie('token')
        res.status(200).json({ message: 'user logged out successfully' })
    }


}

/**
 * @name getMeController
 * @description get the current user loged in details
 * @access Private
 */

async function getMeController(req, res) {
    const user = await usermodel.findById(req.user.id)
    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController

}



