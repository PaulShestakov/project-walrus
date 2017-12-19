export default {
	'filter': {
		'id': '/src/server/controller/companies/index/getFiltered',
		'type': 'object',
    
		'properties': {
			'companyCategoryId': {
				'type': 'string'
			},
			'companySubcategoryId': {
				'type': 'string'
			},
			'isWorkingNow': {
				'enum': ['true', 'false']
			},
			'cityId': {
				'type': 'string',
			},
			'animalId': {
				'type': 'string'
			}
		},
    
		'required': ['companyCategoryId', 'companySubcategoryId']
	}
};