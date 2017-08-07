interface CodeValue {
    NAME : string
}

interface Animal extends CodeValue {
    ANIMAL_ID : string
}

interface Breed extends CodeValue {
    BREED_ID : string,
    ANIMAL_ID : string
}

interface City extends CodeValue {
    CITY_ID : string
}

export { Animal, Breed, City };