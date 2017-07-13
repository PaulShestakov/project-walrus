class Mapper {

    public static PROMO : Map<string, string> = {
        'uuid'          :   'pr_uuid',
        'title'         :   'pr_title',
        'description'   :   'pr_description',
        'city'          :   'pr_city',
        'animal'        :   'pr_animal',
        'breed'         :   'pr_breed',
        'image'         :   'pr_image',
        'type'          :   'pr_type',
        'status'        :   'pr_status',
        'user_id'       :   'user_id'
    };

    public static PROMO_INFO : Map<string, string> = {

    };

    public map(json : JSON, map : Map<string, string>) {
        let result = {};
        for (let key in json) {
            if (map.has(key)) {
                result[map.get(key)] = json.key;
            }
        }
        return result;
    }
}

export default new Mapper();