import globalStyle from '../../../style';

export default {

    cardImage: {
        backgroundSize: 'contain',
        width: '100%',
        height: '12rem'
    },

    link: {
        color: 'white',
        textDecoration: 'none'
    },

    tabs: {
        '& button': {
            minWidth: 'auto',
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',

            '& span': {
                fontFamily: globalStyle.BEBAS_FONT,
                fontSize: '1.2rem'
            }
        }
    },

}