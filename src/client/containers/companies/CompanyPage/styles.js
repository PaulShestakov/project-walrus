import globalStyle from '../../../style';

export default {

	mainCardWrapper: {
	    height: '100%',
	    display: 'flex',
        flexDirection: 'column',
    },

	mainCard: {
	    flexGrow: 1,
    },

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

    context: {
	    minHeight: '450px'
    }

}