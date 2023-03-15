import { Validator } from "./Validator.js"

export const StorePostValidation = async (req, res, next) => {
    const rule = {
        title : {
            required: true,
            type: "string",
            min: 5,
        },
        description: {
            required: true,
            type: "string",
            min: 30,
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