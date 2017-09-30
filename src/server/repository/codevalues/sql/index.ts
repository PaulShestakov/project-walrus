const CODE_VALUE_TABLE = 'wikipet.code_values';

export default {
    TABLE_NAME: CODE_VALUE_TABLE,

    GET_BY_TYPES: `
        SELECT
            cv.ID,
            cv.GROUP,
            cv.NAME
        FROM ${CODE_VALUE_TABLE} AS cv
        WHERE cv.GROUP IN (?)
            ORDER BY cv.SORT`,
    
    GET_COMPANIES_CATEGORIES: `
        SELECT 
            cv1.ID AS categoryId,
            cv1.NAME AS categoryName,
            cv1.SORT AS categorySort,

            cv2.ID AS subcategoryId,
            cv2.NAME AS subcategoryName,
            cv2.SORT AS subcategorySort

        FROM ${CODE_VALUE_TABLE} AS cv1 
        JOIN ${CODE_VALUE_TABLE} AS cv2 
            ON cv2.GROUP LIKE CONCAT('%', cv1.ID, '%')

        WHERE cv1.GROUP = 'COMPANY_CATEGORY'
    `
};