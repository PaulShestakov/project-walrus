export default class Mapper {

    PROMO : Map<string, string> = new Map([
        ['title'         ,   'pr_title'],

        ['city'          ,   'city_id'],

        ['animal'        ,   'animal_id'],
        ['breed'         ,   'breed_id'],

        ['image'         ,   'pr_image'],
        ['type'          ,   'ty_id'],
        ['status'        ,   'st_id'],
        ['userId'        ,   'user_id'],

        ['description'   ,   'pr_description'],
    ]);

    PROMO_INFO : Map<string, string> = new Map([
        ['uuid'          ,   'pi_uuid'],
        ['address'       ,   'pi_address'],
        ['date'          ,   'pi_date'],
        ['gender'        ,   'pi_gender'],
        ['age'           ,   'pi_age'],
        ['price'         ,   'pi_cost']
    ]);

    mapToEntity(json : JSON, map : Map<string, string>, additionalValues : any) : JSON {
        let result = additionalValues;
        for (let key in json) {
            if (map.has(key) && json[key]) {
                result[map.get(key)] = json[key];
            }
        }
        return result;
    }

    mapToDTO(json : JSON, map : Map<string, string>, additionalValues : any) : JSON {
        let result = additionalValues;
        map.forEach(function (value , key) {
            if (json[value]) {
                result[key] = json[value];
            }
        });
        return result;
    }
}