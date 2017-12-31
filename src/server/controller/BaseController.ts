import {Response} from 'express';

export default class BaseController {

    protected okResponse(res: Response, result : any) : void {
        res.status(200).send(result);
    }

    protected errorResponse(res: Response, code: number, error: string|Object): void {
        // use logger here
        console.log(error);
        res.status(code).send({error});
    }

    protected checkRole(req: any, res: Response, role): boolean {
        if (req.user && req.user.user_group === role) {
            return true;
        }
        res.status(401).send({ message: "You don't have an appropriate permission for access"});
        return false;
    }

    protected getOrdinalResponseCallback(res: Response) {
        return (error, data) => {
            if (error) {
                this.errorResponse(res, 500, error);
                return;
            }
            this.okResponse(res, data);
        };
    }
}
