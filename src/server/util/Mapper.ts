export default class Mapper {

    PROMO : Map<string, string> = new Map([
        ['title'         ,   'TITLE'],
        ['city'          ,   'CITY_ID'],
        ['animal'        ,   'ANIMAL_ID'],
        ['breed'         ,   'BREED_ID'],
        ['image'         ,   'IMAGE'],
        ['type'          ,   'TYPE_ID'],
        ['status'        ,   'STATUS_ID'],
        ['userId'        ,   'USER_ID'],
        ['description'   ,   'DESCRIPTION'],
    ]);

    PROMO_INFO : Map<string, string> = new Map([
        ['uuid'          ,   'PROMO_INFO_ID'],
        ['address'       ,   'ADDRESS'],
        ['date'          ,   'DATE'],
        ['gender'        ,   'GENDER'],
        ['age'           ,   'AGE'],
        ['price'         ,   'COST']
    ]);

    mapToEntity(json: any, map: Map<string, string>, baseObject: any): any {

        return Object.keys(json).reduce((acc, key) => {

            if (map.has(key)) {
                acc[map.get(key)] = json[key];
            }

            return acc;

        }, baseObject || {});
    }

    mapToDTO(json: any, map: Map<string, string>, baseObject: any): any {

        return Array.from(map.keys()).reduce((acc, key) => {
            const mapValue = map.get(key);

            if (json[mapValue]) {
                acc[key] = json[mapValue];
            }
            return acc;

        }, baseObject || {});
    }
}