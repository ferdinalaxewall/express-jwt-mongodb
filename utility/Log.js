export default class Log{
    static baseMessage(type, message){
        const currentDate = new Date();
        const date = `${currentDate.getDay()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        return `[${date}] (${type}) => ${message}`;
    }

    static info(message){
        console.info(this.baseMessage("INFO", message));
    }

    static success(message){
        console.log(this.baseMessage("SUCCESS", message));
    }

    static error(message){
        console.error(this.baseMessage("ERROR", message));
    }

    static warning(message){
        console.warn(this.baseMessage("WARNING", message));
    }

}