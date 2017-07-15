import executeQuery from 'database/Pool';

export default class BaseCRUD {

    protected TABLE_NAME : string;

    private GET_ALL :       string = 'SELECT * FROM ' + this.TABLE_NAME;
    private GET_BY_UUID :   string = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';
    private SAVE :          string = 'INSERT INTO   ' + this.TABLE_NAME + ' set ?';
    private UPDATE :        string = 'UPDATE        ' + this.TABLE_NAME + ' set ? WHERE UUID = ?';
    private DELETE :        string = 'DELETE FROM   ' + this.TABLE_NAME + ' WHERE UUID = ?';

    /**
     * Get by uuid
     * @param uuid
     * @returns {Promise<T>}
     */
    public async get(uuid : string) : Promise<object> {
        return await executeQuery(this.GET_BY_UUID, [uuid]);
    }

    /**
     * Get all
     * @returns {Promise<T>}
     */
    public async getAll() : Promise<object> {
        return await executeQuery(this.GET_ALL, []);
    }
}