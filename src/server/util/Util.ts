export default class Util {

    isEmpty(obj) : boolean {
        return Object.keys(obj).length === 0;
    }

    public static handleError(error, callback) {
        if (error) {
            console.log(error);
            callback(error);
        }
    }

}