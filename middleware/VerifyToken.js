import jwt from "jsonwebtoken";
import Log from "../utility/Log.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        Log.error("Failed to access:  Not authorized!");
        return res.status(401).json({ message: "You're not authorize!" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { 
        if(err){
            Log.error("Failed to access:  Forbidden Access!");
            return res.status(403).json({ message: "Forbidden Access!" });
        }
        req.email = decoded.email;
        next();
    });
}