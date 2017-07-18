export default class Mapper {

    PROMO : Map<string, string> = new Map([
        ['uuid'          ,   'pr_uuid'],
        ['title'         ,   'pr_title'],
        ['description'   ,   'pr_description'],
        ['city'          ,   'pr_city'],
        ['animal'        ,   'pr_animal'],
        ['breed'         ,   'pr_breed'],
        ['image'         ,   'pr_image'],
        ['type'          ,   'ty_id'],
        ['status'        ,   'st_id'],
        ['user_id'       ,   'user_id'],
        ['promo_info_id' ,   'pi_uuid']
    ]);

    PROMO_INFO : Map<string, string> = new Map([
        ['uuid'          ,   'pi_uuid'],
        ['address'       ,   'pi_address'],
        ['date'          ,   'pi_date'],
        ['gender'        ,   'pi_gender'],
        ['age'           ,   'pi_age'],
        ['cost'          ,   'pi_cost']
    ]);

    mapToEntity(json : JSON, map : Map<string, string>) : JSON {
        let result = {};
        for (let key in json) {
            if (map.has(key)) {
                result[map.get(key)] = json[key];
            }
        }
        return result;
    }

    mapToDTO(json : JSON, map : Map<string, string>) : JSON {
        let result = {};
        map.forEach(function (value , key) {
            if (json[value]) {
                result[key] = json[value];
            }
        });
        return result;
    }
}