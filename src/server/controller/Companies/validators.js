export default {
    "filter": {
        "id": "/src/server/controller/companies/index/getFiltered",
        "type": "object",
    
        "properties": {
            "companyCategoryId": {
                "type": "string"
            },
            "companySubcategoryId": {
                "type": "string"
            },
            "isWorkingNow": {
                "enum": ["true", "false"]
            },
            "cityId": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            }
        },
    
        "required": ["companyCategoryId", "companySubcategoryId", "isWorkingNow"]
    }
}