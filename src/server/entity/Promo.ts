interface PromoEntity {
    PROMO_ID : string,
    TITLE : string,
    DESCRIPTION : string,
    CREATION_DATE : Date,
    MODIFICATION_DATE : Date,
    CITY_ID : string,
    ANIMAL_ID : string,
    BREED_ID : string,
    IMAGE : string,
    TYPE_ID : string,
    STATUS_ID : string,
    USER_ID : string,
    PROMO_USER_ID : string
}

interface PromoInfoEntity  {
    PROMO_INFO_ID : string
    PROMO_ID : string,
    ADDRESS : string,
    DATE : Date,
    GENDER : string,
    AGE : number,
    COST : number
}

interface PromoImage {
    PROMO_IMAGE_ID : string,
    PROMO_ID : string,
    IMAGE_PATH : string,
    IS_MAIN : string
}

interface Status {
    STATUS_ID : string
}

interface Type {
    TYPE_ID : string
}

interface PromoUser {
    PROMO_USER_ID : string,
    USER_NAME : string,
    EMAIL : string,
    PHONE : string
}

export { PromoEntity, PromoInfoEntity, PromoImage, Status, Type, PromoUser };