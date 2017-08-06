export default class Util {

    static isEmpty(obj) : boolean {
        return Object.keys(obj).length === 0;
    }

    static wrapWithArray(element : any) {
        return Array.isArray(element) ? element : (element) ? [element] : [];
    }

    static handleError(error, callback) {
        if (error) {
            console.log(error);
            if (callback) {
                callback(error);
            }
        }
    }

}