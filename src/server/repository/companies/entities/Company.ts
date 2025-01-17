interface Company {
	companyId: string,
	name: string,
	logo: string,
	description: string,
	email: string,
	url: string,
	url_id: string,
	image: object,
    animals: Array<object>,
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