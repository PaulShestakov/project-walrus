const USERS_TABLE = 'dle_users';
const USER_KEY = 'user_key';

export default {
    TABLE_NAME: USERS_TABLE,

    GET_BY_ID : `SELECT * FROM ${USERS_TABLE} u WHERE u.user_id = ?`,
    GET_BY_NAME_AND_PASSWORD : `SELECT * from ${USERS_TABLE} u WHERE u.name = ? AND u.password = ?`,

    GET_KEY_BY_JWT: `SELECT USER_KEY ukey FROM ${USER_KEY} WHERE JWT_HASH = ?`,
};