import promoInfoTable from './PromoInfo';
import promoImages from './PromoImages';

let table = 'WIKIPET.PROMO';
let infoTable = promoInfoTable.TABLE_NAME;
let images = promoImages.TABLE_NAME;

export default {
    TABLE_NAME    : table,

    GET_ALL       :
    'SELECT * FROM ' + table     + ' AS PR ' +
    'LEFT JOIN '     + infoTable + ' AS PI ON PR.PI_UUID = PI.PI_UUID ' +
    'LEFT JOIN '     + images    + ' AS IM ON PI.PI_UUID = IM.PI_UUID ', //?????

    SAVE          : 'INSERT INTO   ' + table + ' set ?'
};