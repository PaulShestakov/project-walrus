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
        height: '100%',
        minHeight: '15rem'
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
    },

    editButtonsBlock: {
        flexShrink: 0,
        marginTop: '10px',
        textAlign: 'right'
	},

    editButton: {
		flexShrink: 0,
		alignSelf: 'flex-start',
		width: '2.5rem',
		height: '2.5rem',
		marginLeft: '0.5rem',
	},
	editIcon: {
		color: 'white'
	},

}