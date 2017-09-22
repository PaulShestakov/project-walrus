import {Router} from "express";

import promoCodevaluesRouter from "./codevalues/PromoCodevalues";
import companiesCategoriesRouter from "./codevalues/CompaniesCategoriesRouter";

const codevaluesRouter = Router();

codevaluesRouter.use('/promo', promoCodevaluesRouter);
codevaluesRouter.use('/companiesCategories', companiesCategoriesRouter);

export default codevaluesRouter;