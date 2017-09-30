const CODE_VALUE_TABLE = 'wikipet.code_values';

export default {
    TABLE_NAME: CODE_VALUE_TABLE,

    GET_BY_TYPES: `SELECT cv.ID, cv.GROUP, cv.NAME FROM ${CODE_VALUE_TABLE} cv WHERE cv.GROUP IN (?) ORDER BY cv.SORT`,
    
    GET_COMPANIES_CATEGORIES: `
        SELECT 
            cv1.ID categoryId,
            cv1.NAME categoryName,

            cv2.ID subCategoryId,
            cv2.NAME subCategoryName

        FROM ${CODE_VALUE_TABLE} cv1 
        JOIN ${CODE_VALUE_TABLE} cv2 
            ON cv2.GROUP LIKE CONCAT('%', cv1.ID, '%')

        WHERE cv1.GROUP = 'COMPANY_CATEGORY'
    `
};