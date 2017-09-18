import {Router} from "express";

import promoCodevaluesRouter from "./codevalues/PromoCodevalues";
import companiesTypesRouter from "./codevalues/CompaniesTypesRouter";

const codevaluesRouter = Router();

codevaluesRouter.use('/promo', promoCodevaluesRouter);
codevaluesRouter.use('/companiesTypes', companiesTypesRouter);

export default codevaluesRouter;