class custom_error extends Error {
    readonly code: number;
    public openning_balance?: string;

    constructor(name: string, code: number, message: string, openning_balance?: string) {
        super(message);
        this.name = name;
        this.code = code;
        this.openning_balance = openning_balance;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default custom_error;
