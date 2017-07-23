export default class Mapper {

    PROMO : Map<string, string> = new Map([
        ['title'         ,   'PR_TITLE'],

        ['city'          ,   'CITY_ID'],

        ['animal'        ,   'ANIMAL_ID'],
        ['breed'         ,   'BREED_ID'],

        ['image'         ,   'PR_IMAGE'],
        ['type'          ,   'TY_ID'],
        ['status'        ,   'ST_ID'],
        ['userId'        ,   'USER_ID'],

        ['description'   ,   'PR_DESCRIPTION'],
    ]);

    PROMO_INFO : Map<string, string> = new Map([
        ['uuid'          ,   'PI_UUID'],
        ['address'       ,   'PI_ADDRESS'],
        ['date'          ,   'PI_DATE'],
        ['gender'        ,   'PI_GENDER'],
        ['age'           ,   'PI_AGE'],
        ['price'         ,   'PI_COST']
    ]);

    mapToEntity(json : JSON, map : Map<string, string>, additionalValues : any) : JSON {
        let result = {...additionalValues};
        for (let key in json) {
            if (map.has(key) && json[key]) {
                result[map.get(key)] = json[key];
            }
        }
        return result;
    }

    mapToDTO(json : JSON, map : Map<string, string>, additionalValues : any) : JSON {
        let result = {...additionalValues};
        map.forEach(function (value , key) {
            if (json[value]) {
                result[key] = json[value];
            }
        });
        return result;
    }
}