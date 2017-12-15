const CODE_VALUE_TABLE = 'code_values';
const COMPANIES_TABLE = 'companies';
const EXTENSION = 'companies_code_values_ext';

export default {
    TABLE_NAME: CODE_VALUE_TABLE,

    GET_BY_TYPES: `
        SELECT
            cv.ID,
            cv.GROUP,
            cv.NAME,
            cv.SORT
        FROM ${CODE_VALUE_TABLE} AS cv
        WHERE cv.GROUP IN (?)
            ORDER BY cv.SORT`,
    
    GET_COMPANIES_CATEGORIES: `
        SELECT 
            cv1.ID AS categoryId,
            cv1.NAME AS categoryName,
            cv1.SORT AS categorySort,
            
            ext.IMAGE_URL as catImageUrl,
            ext.DESCRIPTION as catDescription,

            cv2.ID AS subcategoryId,
            cv2.NAME AS subcategoryName,
            cv2.SORT AS subcategorySort,
            
            ext1.IMAGE_URL as subCatImageUrl,
            ext1.DESCRIPTION as subCatDescription,

            t0.number AS number

        FROM ${CODE_VALUE_TABLE} AS cv1
        JOIN ${CODE_VALUE_TABLE} AS cv2
            ON cv2.GROUP LIKE CONCAT('%.', cv1.ID, '%')
        LEFT JOIN ${EXTENSION} as ext
            ON cv1.ID = ext.ID
        LEFT JOIN ${EXTENSION} as ext1
            ON cv2.ID = ext1.ID
        LEFT JOIN
            (SELECT COMPANY_SUBCATEGORY_ID, COUNT(*) AS number FROM ${COMPANIES_TABLE} GROUP BY COMPANY_SUBCATEGORY_ID) as t0
            ON cv2.ID = t0.COMPANY_SUBCATEGORY_ID

        WHERE cv1.GROUP = 'COMPANY_CATEGORY'
            ORDER BY cv1.SORT, cv2.SORT
    `,

    GET_COUNTIRES: `
        SELECT
            cv0.ID as countryId,
            cv0.NAME as countryName,
            cv0.SORT as countrySort,

            cv1.ID AS cityId,
            cv1.NAME AS cityName,
            cv1.SORT AS citySort,

            cv2.ID AS subCityId,
            cv2.NAME AS subCityName,
            cv2.SORT AS subCitySort,

            cv3.ID AS citySubwayId,
            cv3.NAME AS citySubwayName,
            cv3.SORT AS citySubwaySort

        FROM ${CODE_VALUE_TABLE} AS cv0

        LEFT JOIN ${CODE_VALUE_TABLE} AS cv1
            ON cv1.GROUP LIKE CONCAT('CITY.', cv0.ID, '%')

        LEFT JOIN ${CODE_VALUE_TABLE} AS cv2
            ON cv2.GROUP LIKE CONCAT('CITY.', cv1.ID, '%')

        LEFT JOIN ${CODE_VALUE_TABLE} AS cv3
            ON cv3.GROUP LIKE CONCAT('SUBWAY.', cv1.ID, '%')

        WHERE cv0.GROUP = 'COUNTRY'
            ORDER BY cv0.SORT, cv1.SORT, cv2.SORT, cv3.SORT
    `,

    GET_ANIMALS: `
        SELECT
            cv1.ID AS animalId,
            cv1.NAME AS animalName,
            cv1.SORT AS animalSort,

            cv2.ID AS breedId,
            cv2.NAME AS breedName,
            cv2.SORT AS breedSort
            
        FROM ${CODE_VALUE_TABLE} AS cv1
        LEFT JOIN ${CODE_VALUE_TABLE} AS cv2
            ON cv2.GROUP LIKE CONCAT('BREED.', cv1.ID, '%')
        WHERE cv1.GROUP = 'ANIMAL'
            ORDER BY cv1.SORT, cv2.SORT
    `,
};