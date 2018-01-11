import BaseCRUD from "../../BaseCRUD";
import { executeQuery } from "../../../database/DBHelper";
import Queries from "../sql/Queries";
import * as uuid from 'uuid';
import Mailer from '../../../util/Mailer';

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
			executeQuery(Queries.GET_FOR_FEEDBACK_BY_PK, [feedback.companyId], (error, rows) => {
				if (error) {
					console.log('Error in getting company ' + error);
					return;
				}
				rows = rows[0];
				const link = `http://catalogi.wikipet.by/company/${rows["categoryId"]}/${rows["subcategoryId"]}/company/${rows["urlId"]}/feedbacks`;
				const message = feedback.feedback;
				Mailer.sendEmail({
					from: "wikipet.by@gmail.com",
					to: "wikipet.by@gmail.com",
					subject: "Был оставлен комментарий",
					html: `
						<div>Сообщение : ${message}</div>
						<div>Ссылка : ${link}</div>
				 	 `
				});
			});
			callback(null, 'Success');
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
			COMPANY_LOCATION_ID: feedback.locationId,
			USER_ID: feedback.user,
			FEEDBACK: feedback.feedback,
			RATING: feedback.rating,
			CREATION_DATE: new Date(),
			MODIFICATION_DATE: new Date(),
		}
	}
}