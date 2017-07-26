interface PromoEntity extends JSON {
    PROMO_ID: string,
    TITLE: string,
    DESCRIPTION: string,
}

interface PromoInfoEntity extends JSON  {
    PROMO_INFO_ID: string
    PROMO_ID: string
}

interface PromoImage extends JSON {
    PROMO_IMAGE_ID: string,
    PROMO_ID: string,
    IMAGE_PATH: string
}

export { PromoEntity, PromoInfoEntity, PromoImage };