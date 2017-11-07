export default class Util {

    static isEmpty(obj): boolean {
        return Object.keys(obj).length === 0;
    }

    static ensureArray(element: any): any[] {
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

    static resolvePromise(resolve, reject) {
    	return (error, result) => {
    		if (error) {
    			reject(error);
			} else {
    			resolve(result);
			}
		}
	}

    static reduceFlatData(rows, shape) {

    	if (rows.length === 0) {
    		return {};
		}

		function reduceRow(target, row, shape) {

			if (!target[shape.name]) {
				target[shape.name] = {};
			}

			const accObject = target[shape.name];
			const reduceId = row[shape.idName];
			if (reduceId != null) {
				if (!accObject[reduceId]) {
					accObject[reduceId] = shape.map(row);
				}

				const newTarget = accObject[reduceId];

				if (shape.children && shape.children.length > 0) {
					shape.children.forEach(reduceRow.bind(null, newTarget, row));
				}
			}
		}

		const accumulatedObject = rows.reduce((acc, row) => {
			reduceRow(acc, row, shape);
			return acc;
		}, {});


		function mapsToArrays(accLevel, shapeLevel) {
			accLevel[shapeLevel.name] = Object.values(accLevel[shapeLevel.name]);

			if (shapeLevel.children && shapeLevel.children.length > 0) {
				accLevel[shapeLevel.name].forEach(newAccLevel => {
					shapeLevel.children.forEach(newShapeLevel => {
						mapsToArrays(newAccLevel, newShapeLevel)
					});
				});
			}

		}

		mapsToArrays(accumulatedObject, shape);

		return accumulatedObject;
    }
}