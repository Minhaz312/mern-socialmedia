import jwt from "jsonwebtoken";

const AuthMiddleware = (req,res,next) => {
    try {
        const bearerTokenSplit = req.headers.authorization.split(" ")
        const token = bearerTokenSplit[1];
        if(token === undefined) {
            res.status(401)
            next("Unathorized")
        }else{
            const decoded = jwt.verify(token,process.env.JWT_SECRETE,{algorithm:"HS256"})
            req.body.myId = decoded.user
            next()
        }
    }catch (error) {
        res.status(401)
        next("unauthorized action")
    }
}

export default AuthMiddleware;