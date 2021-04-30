const Users = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    register: async (req, res) => {
        try {
            
            const {name, email, password} = req.body;

            const user = await Users.findOne({email});

            if(user) {
                return res.status(400).json({ msg: 'The email already exists.' })
            }

            if(password.length < 6) {
                return res.status(400).json({ msg: 'The password is small, at least 6 character' })
            }

            // Bcrypt
            const passwordHash = await bcrypt.hash(password, 10);

            // Create new User
            const newUser = await new Users({
                name, email, password: passwordHash
            })

            await newUser.save()

            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({ accesstoken })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login: async (req, res) => {
        try {
            
            const {email, password} = req.body;

            const user = await Users.findOne({email})

            if(!user) {
                return res.status(400).json({ msg: 'The User does not exist.' })
            }

            // Compare Password
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({ mag: 'The password is Incorrect' })
            }

            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({ accesstoken })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})

            res.json({ msg: 'Logged out' })

        } catch (error) {
            return res.status(500).json({ msg: erro.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            
            const rf_token = req.cookies.refreshtoken;

            if(!rf_token) {
                return res.status(400).json({ msg: 'Please login or Register' })
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                const accesstoken = createAccessToken({id: user.id})

                res.json({ accesstoken })
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            
            const user = await Users.findById(req.user.id).select('-password')

            if(!user) {
                return res.status(400).json({ msg: 'User does not exist.' })
            }

            res.json(user)

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addCart: async (req, res) => {
        try {
            
            const user = await Users.findById(req.user.id)

            if(!user) return res.status(400).json({ msg: "User does not exist." })

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({ msg: 'Added to cart' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl