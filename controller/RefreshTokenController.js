import User from "../model/User.js";
import jwt from "jsonwebtoken";
import Log from "../utility/Log.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            Log.error("Failed to access:  Not authorized!");
            return res.status(401).json({ message: "You're not authorize!"} );
        }
        const user = await User.findOne({refresh_token: refreshToken});

        if(!user){
            Log.error("Failed to access:  Forbidden Access!");
            return res.status(403).json({ message: "Forbidden Access!" });
        } 

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                Log.error("Failed to access:  Forbidden Access!");
                return res.status(403).json({ message: "Forbidden Access!" });
            }
            const { _id: userId, name, email } = user;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s',
            });

            Log.error("Successfully Generate Refresh Token: " + accessToken);
            return res.json({ accessToken, })
        })
    } catch (error) {
        Log.error("Something went wrong => " + error);
        return res.status(500).json({
            message: error
        })
    }
}