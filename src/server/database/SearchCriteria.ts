interface Criteria {
    limit : string,
    offset : string,
    order : string
}

interface PromoCriteria extends Criteria {
    animal : string,
    breed : string,
    city : string
    type : string,
    status : Array<string>
}

class SearchCriteria {

    constructor() {

    }

    buildQuery(baseQuery : string, criteria : Criteria) {

    }
}