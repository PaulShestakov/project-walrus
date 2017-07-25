import promoInfo from './PromoInfo';
import promoImages from './PromoImages';

const PROMO_TABLE = 'wikipet.promo';
const PROMO_INFO_TABLE = promoInfo.TABLE_NAME;
const PROMO_IMAGES_TABLE = promoImages.TABLE_NAME;

export default {
    TABLE_NAME: PROMO_TABLE,

    GET_ALL:
        `SELECT * FROM ${PROMO_TABLE} AS p
        
            LEFT JOIN ${PROMO_INFO_TABLE} AS p_info ON p_info.PI_UUID = p.PI_UUID
        
            LEFT JOIN ${PROMO_IMAGES_TABLE} AS p_images ON p_images.PI_UUID = p.PI_UUID`,

    SAVE: `INSERT INTO ${PROMO_TABLE} SET ?`,

    DELETE: `DELETE FROM ${PROMO_TABLE} WHERE PR_UUID = ?`,
};