import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
    const token = jwt.sign({id: user._id, role: user.isAdmin, username: user.fullName}, "secretKey", {expiresIn: "1h"})

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60*60*1000
    })
}