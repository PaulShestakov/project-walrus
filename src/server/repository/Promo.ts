import Pool from './../database/Pool';

class Promo {

    private TABLE_NAME = 'WIKIPET.PROMO';

    private GET_ALL : string = 'SELECT * FROM ' + this.TABLE_NAME;
    private GET_BY_UUID : string = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';
    private SAVE : string = 'INSERT INTO ' + this.TABLE_NAME + ' set ?';
    private UPDATE : string = 'UPDATE ' + this.TABLE_NAME + ' set ? WHERE UUID = ?';
    private DELETE : string = 'DELETE FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';

    public get(uuid : string, callback) : void {
        Pool((con) => {
            con.query(this.GET_BY_UUID, [uuid], (err, rows) => {
                if (err) {
                    console.log('Error during getting promo ' + uuid + ' error : ' + err);
                } else {
                    callback(err, rows[0]);
                }
            });
        });
    }

    public getAll(callback) : void {
        Pool((con) => {
            con.query(this.GET_ALL, [], (err, rows) => {
                if (err) {
                    console.log('Error during getting all promos ' + err);
                }
                callback(err, rows);
            });
        });
    }

    public save(promo : any, callback) : void {
        Pool((con) => {
            con.query(this.SAVE, [promo], (err, rows) => {
                if (err) {
                    console.log('Error during inserting promo ' + err);
                } else {
                    console.log(promo.title + ' was saved');
                }
                callback(err);
            });
        });
    }

    public update(promo : any, callback) : void {
        Pool((con) => {
            con.query(this.UPDATE, [promo], (err, rows) => {
                if (err) {
                    console.log('Error during updating promo ' + err);
                } else {
                    console.log(promo.title + ' was updated');
                }
                callback(err);
            });
        });
    }

    public remove(uuid : string, callback) : void {
        Pool((con) => {
            con.query(this.DELETE, [uuid], (err, rows) => {
                if (err) {
                    console.log('Error during deleting promo ' + err);
                } else {
                    console.log(uuid + ' was deleted');
                }
                callback(err);
            });
        });
    }
}

export default new Promo();