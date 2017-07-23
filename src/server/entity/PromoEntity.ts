interface PromoEntity extends JSON {
    title       : string,
    description : string,
    pi_uuid     : any,
    pr_uuid     : any
}

interface PromoInfoEntity extends JSON  {
    pi_uuid        : string
}
interface PromoImage extends JSON {
    uuid        : string,
    pi_uuid     : string,
    image_path  : string
}

export { PromoEntity, PromoInfoEntity, PromoImage };