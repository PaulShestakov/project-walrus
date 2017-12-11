const TABLE_NAME = 'promo_info';

export default {
    TABLE_NAME,

    SAVE: `INSERT INTO ${TABLE_NAME} SET ?`,

    DELETE: `DELETE FROM ${TABLE_NAME} WHERE PROMO_ID = ?`
};