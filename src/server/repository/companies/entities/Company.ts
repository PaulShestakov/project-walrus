import { map } from "async";
import { exec } from "child_process";

interface Company {
	companyId: string,
	name: string,
	logo: string,
	description: string,
	email: string,
	url: string,
	url_id: string,
	image: any,
	animals: Array<any>,
	drugsTypes: Array<any>,
	ownerTypes: Array<any>,
	jobTypes: Array<any>,
	clinicsServices: Array<any>,
	torgTypes: Array<any>,
    companyCategoryId: string,
    companySubcategoryId: string,
	vk: string,
	facebook: string,
	instagram: string,
	locations: Array<object>,
}

interface IFeedback {
	user: object,
	companyId: string,
	locationId: string,
	feedback: string,
	rating: number,
}

export { Company, IFeedback };