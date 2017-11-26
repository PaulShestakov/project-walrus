import { createSelector } from 'reselect';

export const extendCodeValues = () => {
    return createSelector(
        [state => state.common],
        (common) => {
            common.countries.forEach(item => {
               const allCities = [];
               item.cities.forEach(city => {
                   allCities.push({
                       label: city.label,
                       value: city.value,
                       subways: city.subways
                   });
                   city.subCities.forEach(subCity => {
                       allCities.push({
                           label: subCity.label,
                           value: subCity.value
                       });
                   });
               });
               item.allCities = allCities;
            });
            return common;
        }
    );
};