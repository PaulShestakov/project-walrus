interface Company {
	companyId: string,
	name: string,
	logo: string,
	description: string,
	email: string,
	url: string,
	image: object,
    companyCategoryId: string,
    companySubcategoryId: string,
	locations: Array<object>,
}

interface IFeedback {
	user: object,
	companyId: string,
	feedback: string,
	summary: string,
	rating: number,
}