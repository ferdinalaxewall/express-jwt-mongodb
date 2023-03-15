import { Validator } from "./Validator.js"

export const RegisterValidation = async (req, res, next) => {
    const rule = {
        name: {
            required: true,
            type: "string",
            min: "3",
        },
        email : {
            required: true,
            type: "email",
        },
        password: {
            required: true,
            type: "string",
        },
        confirmPassword: {
            required: true,
            type: "string",
        }
    }

    const objectValidation = Validator(req.body, rule);
    if(objectValidation.isValid){
        next();
    }else{
        res.status(400).json({
            error: 'Invalid Request',
            message: objectValidation.message
        });
    }
}