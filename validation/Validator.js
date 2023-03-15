export const Validator = (req, option) => {
    let result = { message: "All request is valid!", isValid: true };
    for (const rule in option) {
        if(option[rule].hasOwnProperty('required') && option[rule].required === true){
            const isValidRequest = req[rule] !== undefined && req[rule] !== null && req[rule] !== "";
            if(!isValidRequest){
                result.message = `'${rule}' is required, and not be empty!`;
                result.isValid = false;
                break;
            }
        }
        
        if(option[rule].hasOwnProperty('type')){
            if(option[rule].type === "string" && typeof(req[rule]) !== "string"){
                result.message = `'${rule}' must be type of String!`;
                result.isValid = false;
                break;
            }else if(option[rule].type === "number" && typeof(req[rule]) !== "number"){
                result.message = `'${rule}' must be type of Number!`;
                result.isValid = false;
                break;
            }else if(option[rule].type === "email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req[rule]))){
                result.message = `'${rule}' must be in the correct format!`;
                result.isValid = false;
                break;
            }
        }

        if(option[rule].hasOwnProperty('min') && typeof(option[rule].min) === "number" && req[rule].length < option[rule].min){
            result.message = `'${rule}' must not be less than ${option[rule].min} characters!`;
            result.isValid = false;
            break;
        }
    }

    return result;
}