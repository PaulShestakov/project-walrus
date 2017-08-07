const TABLE_NAME = 'wikipet.promo_users';

export default {
    TABLE_NAME,

    SAVE: `INSERT INTO ${TABLE_NAME} SET ?`,

    DELETE: `DELETE FROM ${TABLE_NAME} WHERE PROMO_USER_ID = ?`
};