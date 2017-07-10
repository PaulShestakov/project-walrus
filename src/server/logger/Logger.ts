import * as winston from 'winston';

const log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

export default log;