class HttpError extends Error{
    errorMessage;
    code;
    constructor(message: string, errorCode: number){
        super(message);
        this.errorMessage = message;
        this.code = errorCode;
    }
}

export default HttpError;