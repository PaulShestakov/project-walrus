import promoInfo from './PromoInfo';
import promoImages from './PromoImages';

const PROMO_TABLE = 'wikipet.promo';
const PROMO_INFO_TABLE = promoInfo.TABLE_NAME;
const PROMO_IMAGES_TABLE = promoImages.TABLE_NAME;

export default {
    TABLE_NAME: PROMO_TABLE,

	GET_ALL: `
	    SELECT
		    p.PROMO_ID,
		    p.TITLE,
		    p.DESCRIPTION,
		    p.CREATION_DATE,
		    p.MODIFICATION_DATE,
		    p.CITY_ID,
		    p.ANIMAL_ID,
		    p.BREED_ID,
		    p.IMAGE,
		    p.TYPE_ID,
		    p.STATUS_ID,
		    p.USER_ID,
		    
		    p_info.ADDRESS,
		    p_info.DATE,
		    p_info.GENDER,
		    p_info.AGE,
		    p_info.COST
		
        FROM ${PROMO_TABLE} AS p
        
        LEFT JOIN ${PROMO_INFO_TABLE} AS p_info
            ON p_info.PROMO_ID = p.PROMO_ID
    `,

    get GET() {
        return this.GET_ALL + `
        WHERE p.PROMO_ID = ?
        `
    },

    SAVE: `INSERT INTO ${PROMO_TABLE} SET ?`,

    DELETE: `DELETE FROM ${PROMO_TABLE} WHERE PROMO_ID = ?`,
};