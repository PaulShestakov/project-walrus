import executeQuery from './../database/Pool';

class Promo {

    private TABLE_NAME :    string = 'WIKIPET.PROMO';

    private GET_ALL :       string = 'SELECT * FROM ' + this.TABLE_NAME;
    private GET_BY_UUID :   string = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';
    private SAVE :          string = 'INSERT INTO   ' + this.TABLE_NAME + ' set ?';
    private UPDATE :        string = 'UPDATE        ' + this.TABLE_NAME + ' set ? WHERE UUID = ?';
    private DELETE :        string = 'DELETE FROM   ' + this.TABLE_NAME + ' WHERE UUID = ?';

    public async get(uuid : string) : Promise<object> {
        return await executeQuery(this.GET_BY_UUID, [uuid]);
    }

    public async getAll() : Promise<object> {
        return await executeQuery(this.GET_ALL, []);
    }

    public async save(promo : JSON) : Promise<object> {
        return await executeQuery(this.SAVE, [promo]);
    }

    public async update(promo : JSON) : Promise<object> {
        return await executeQuery(this.UPDATE, [promo]);
    }

    public async remove(uuid : string) : Promise<object> {
        return await executeQuery(this.DELETE, [uuid]);
    }
}

export default new Promo();