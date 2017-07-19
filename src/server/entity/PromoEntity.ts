interface PromoEntity extends JSON{
    title       : string,
    description : string,
    pi_uuid     : any,
    pr_uuid     : any
}

interface PromoInfoEntity extends JSON{
    pi_uuid        : string
}

export { PromoEntity, PromoInfoEntity };