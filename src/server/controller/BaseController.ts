import { Response } from 'express';

export default class BaseController {

    protected static okResponse(res: Response, result : any) : void {
        res.status(200).send(result);
    }

    protected static error(res: Response, code: number, error: string|Object): void {
        res.status(code).send({error});
    }
}
