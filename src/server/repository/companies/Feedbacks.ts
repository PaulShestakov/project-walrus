import BaseCRUD from "../BaseCRUD";
import { executeQuery } from "../../database/DBHelper";
import Queries from "./sql/Queries";
import * as uuid from 'uuid';

export default class Feedbacks extends BaseCRUD {
	static postFeedback(feedback: IFeedback, callback) {
		executeQuery(Queries.SAVE_FEEDBACK, [Feedbacks.internalizeFeedback(feedback)], (error, result) => {
			if (error) {
				callback(error);
				return;
			}
			callback(null, 'Success');
		});
	}

	static getFeedbacks(companyId: string, callback) {
		executeQuery(Queries.GET_FEEDBACKS, [companyId], (error, result) => {
			if (error) {
				callback(error);
				return;

			}
			const feedbacks = result.reduce((acc, row) => {
				const feedback = {
					id: row.feedbackId,
					feedback: row.feedback,
					summary: row.summary,
					rating: row.rating,
					createDate: row.createDate,
					modificateDate: row.modificateDate,
					user: {
						id: row.userId,
						photo: row.photo,
						name: row.userName
					}
				};
				acc.push(feedback);
				return acc;
			}, []);
			callback(null, feedbacks);
		});
	}

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
			USER_ID: feedback.user,
			FEEDBACK: feedback.feedback,
			SUMMARY: feedback.summary,
			RATING: feedback.rating
		}
	}
}