const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model')

 async function authUser(req, res, next) {
    const token = req.cookies.token

    const isblacklisted = await blacklistTokenModel.findOne({ token })
    if (isblacklisted) {
        return res.status(401).json({ message: 'token is Invalid!' })
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access please logged in to get details' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token please logged in to get details' })
    }
}

module.exports = { authUser }


