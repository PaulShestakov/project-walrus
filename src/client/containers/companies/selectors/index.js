import { createSelector } from 'reselect';

export const extendCodeValues = () => {
    return createSelector(
        [state => state.common],
        (common) => {
            const allCities = common.countries.reduce((acc, item) => {
                item.cities.forEach(city => {
                    acc.push(city);
                    city.subCities.forEach(subCity => {
                        acc.push(subCity);
                    });
                });
                return acc;
            }, []);
            allCities.sort((a, b) => a.label.localeCompare(b.label));
            return {
                ...common,
                allCities
            };
        }
    );
};