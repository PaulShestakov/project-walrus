// collects all the filter constrains
import * as _ from 'lodash';

export function isBreedsVisible(filter) {
    let { companySubcategoryId } = filter;
    companySubcategoryId = _.toUpper(companySubcategoryId);
    return ['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(companySubcategoryId);
}

export function isAnimalsVisible(filter) {
    let { companyCategoryId, companySubcategoryId } = filter;
    companyCategoryId = _.toUpper(companyCategoryId);
    companySubcategoryId = _.toUpper(companySubcategoryId);
    return ['SERVICES'].includes(companyCategoryId) || ['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(companySubcategoryId);
}

export function isSubwaysVisible(filter) {
    return false;
}

export function isCitiesVisible(filter) {
    const { selectedCountry } = filter;
    return !!selectedCountry;
}