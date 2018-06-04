import * as uuid from 'uuid';
import Queries from '../sql/Queries';
import * as async from 'async';
import Util from '../../../util/Util';


import {executeQuery} from '../../../database/DBHelper'

function mapPaymentRecord(payment) {
    return {
        paymentDate: payment.PAYMENT_DATE,
        paymentFrom: payment.PAYMENT_FROM,
        paymentTo: payment.PAYMENT_TO,
    }
}

class Payments {

    getCompanyPayments(companyId, callback) {
        executeQuery(Queries.GET_COMPANY_PAYMENTS, [companyId], (error, rows) => {
            if (error) {
                Util.handleError(error, callback);
            }
            callback(rows.map(mapPaymentRecord))
        })
    }

}

export default new Payments;
