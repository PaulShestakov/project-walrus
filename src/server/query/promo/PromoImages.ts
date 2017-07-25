const TABLE_NAME = 'wikipet.promo_images';

export default {
    TABLE_NAME,

    SAVE_ALL: `INSERT INTO ${TABLE_NAME} (UUID, PI_UUID, Image_Path) VALUES ?`,

    DELETE_BY_PROMO_INFO_ID: `DELETE FROM ${TABLE_NAME} WHERE PI_UUID = ?`
};