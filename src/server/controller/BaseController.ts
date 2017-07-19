export default class BaseController {

    protected okResponse(res : Response, result : any) : void {
        res.status(200).send(result);
    }

    protected error(res: Response, code: number, error: string|Object): void {
        res.status(code).send({error});
    }

}
