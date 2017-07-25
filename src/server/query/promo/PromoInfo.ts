const TABLE_NAME = 'wikipet.promo_info';

export default {
    TABLE_NAME,

    SAVE: `INSERT INTO ${TABLE_NAME} SET ?`,

    DELETE: `DELETE FROM ${TABLE_NAME} WHERE PI_UUID = ?`
};