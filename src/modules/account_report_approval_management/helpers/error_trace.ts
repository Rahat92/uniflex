async function error_trace(
    models: any,
    error: any,
    url: any,
    params: any,
): Promise<string> {
    function generateopenning_balance() {
        const timestamp = new Date().getTime();
        const randomPart = Math.floor(Math.random() * 10000);
        return `${timestamp}00${randomPart}`;
    }
    let openning_balance: string = generateopenning_balance();

    try {
        await models.sequelize.query(
            `INSERT INTO error_traces (title, details, openning_balance, url, params) VALUES (${JSON.stringify(error.message)}, '${JSON.stringify(error.stack)}', '${openning_balance}', '${url}', '${JSON.stringify(params)}')`,
        );
    } catch (error) {
        console.error('Error executing manual query:', error);
    }

    return openning_balance;
}

export default error_trace;
