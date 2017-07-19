import {Router} from 'express';
import PromoCV from "./cv/PromoCV";

class CodeValue {

    router: Router;

    constructor() {
        this.router = Router();
        this.router.use('/promo', PromoCV);
        this.router.use('/', (req,res) => {
            res.status(200).send('Specify any code value name');
        });
    }

}

export default new CodeValue().router;
