const USERS_TABLE = 'wikipet.dle_users';

export default {
    TABLE_NAME: USERS_TABLE,

    GET_BY_ID : `SELECT * FROM ${USERS_TABLE} u WHERE u.user_id = ?`,
    GET_BY_NAME_AND_PASSWORD : `SELECT * from ${USERS_TABLE} u WHERE u.name = ? AND u.password = ?`
};