import BaseCRUD from "../../BaseCRUD";
import { executeQuery } from "../../../database/DBHelper";
import Queries from "../sql/Queries";
import * as uuid from 'uuid';

export default class Feedbacks extends BaseCRUD {

	static mapFeedback(feedback) {
		return {
			feedbackId: feedback.feedbackId,
			companyId: feedback.feedbackCompanyId,
			locationId: feedback.locId,
			feedback: feedback.feedback,
			rating: feedback.rating,
			createDate: feedback.createDate,
			modificateDate: feedback.modificateDate,
			user: {
				id: feedback.userId,
				photo: feedback.photo,
				name: feedback.userName
			}
		};
	}

	static postFeedback(feedback: IFeedback, callback) {
		executeQuery(Queries.SAVE_FEEDBACK, [Feedbacks.internalizeFeedback(feedback)], (error) => {
			if (error) {
				callback(error);
				return;
			}
			callback(null, 'Success');
		});
	}

	// static getFeedbacks(companyId: string, callback) {
	// 	executeQuery(Queries.GET_FEEDBACKS, [companyId], (error, result) => {
	// 		if (error) {
	// 			callback(error);
	// 			return;
    //
	// 		}
	// 		const feedbacks = result.reduce((acc, row) => {
	// 			const feedback = {
	// 				feedbackId: row.feedbackId,
	// 				companyId: row.companyId,
	// 				locationId: row.locId,
	// 				feedback: row.feedback,
	// 				rating: row.rating,
	// 				createDate: row.createDate,
	// 				modificateDate: row.modificateDate,
	// 				user: {
	// 					id: row.userId,
	// 					photo: row.photo,
	// 					name: row.userName
	// 				}
	// 			};
	// 			acc.push(feedback);
	// 			return acc;
	// 		}, []);
	// 		callback(null, feedbacks);
	// 	});
	// }

	static deleteFeedback(feedbackId, callback) {
		executeQuery(Queries.DELETE_FEEDBACK, [feedbackId], (error, result) => {
			if (error) {
				callback(error);
				return;
			}
			callback(null, { status: 'Success'});
		});
	}

	static internalizeFeedback(feedback: IFeedback) {
		return {
			COMPANY_FEEDBACK_ID: uuid(),
			COMPANY_ID: feedback.companyId,
			COMPANY_LOCATION_ID: feedback.locationId,
			USER_ID: feedback.user,
			FEEDBACK: feedback.feedback,
			RATING: feedback.rating,
			CREATION_DATE: new Date(),
			MODIFICATION_DATE: new Date(),
		}
	}
}