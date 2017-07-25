let table = 'wikipet.promo_images';

export default {
    TABLE_NAME : table,

    SAVE_ALL : 'INSERT INTO ' + table + '(UUID, PI_UUID, Image_Path) VALUES ?'
};