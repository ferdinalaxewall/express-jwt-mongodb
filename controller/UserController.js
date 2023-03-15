import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Log from "../utility/Log.js";

export const Register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if(password !== confirmPassword) return res.status(400).json({
            message: "Confirm password not match! Please check your password again!.",
        });

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await new User({
            name,
            email,
            password: hashedPassword,
        });

        user.save()
            .then((data) => {
                Log.success("Account successfully registered! => " + data);
                return res.status(201).json({ message: "Account successfully registered!", data: data });
            })
            .catch((error) => {
                if (error.code === 11000) error = "Email already registered!";
                Log.error("Failed to register account => " + error);
                return res.status(400).json({ message : error });
            });
    } catch (error) {
        Log.error("Something went wrong => " + error);
        return res.status(500).json({ message : "Something went wrong on the server!" });
    }
}

export const Login = async (req, res) => {
    try {
        const { password: reqPassword } = req.body;
        const user = await User.findOne({ email: req.body.email });
        const match = await bcrypt.compare(reqPassword, user.password);
        if(!match){
            Log.error(`Failed to Login: Wrong Password`);
            return res.status(400).json({
                message: 'Wrong Password!',
            });
        } 

        const { _id: userId, name, email } = user;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '2m',
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });
    
        await User.updateOne({_id: userId}, {
            $set: {
                refresh_token: refreshToken,
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }); 

        Log.success("Login Successfully! Access Token: " + accessToken);
        return res.status(200).json({
            accessToken,
        })
    } catch (error) {
        Log.error(`Account with email: ${req.body.email} not found! => ` + error);
        return res.status(404).json({ message : "Email not found!" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({refresh_token: refreshToken});

    if(!user) return res.sendStatus(204);
    const { _id: userId } = user;
    await User.updateOne({_id: userId},{
        $set: {
            refresh_token: null,
        }
    })

    res.clearCookie('refreshToken');
    Log.success("Logout Successfully Successfully! Refresh Token has been removed.");
    return res.status(200).json({
        message: "Logout Successfully!"
    });
}