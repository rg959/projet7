import { Theme, createStyles } from '@material-ui/core/styles';

export type doubleAuthStyles = ("center" | "form" | "back" | "mainDiv" | "img" | "container"
| "link" | "subtitle" | "passwordLost" | "text"); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<doubleAuthStyles, {}>({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
    },
    form: {
        width: '30%', // Fix IE 11 issue.
        textAlign:'center'
    },
    mainDiv: {
        height: '100vh',
    },
    img: {
        marginTop: '-7rem',
        width: '300px'
    },
    container: {
        height: '100vh',
    },
    link: {
        color: 'white',
        textDecoration: 'underline',
        '&:hover' : {
            color: '#ADADAE'
        }
    },
    subtitle: {
        color: 'white',
        marginTop: '4rem',
    },
    passwordLost: {
        marginTop: '0.5rem',
        textAlign: 'right',
    },
    text: {
        color: 'white',
        fontSize : '24px',
        textAlign: 'center',
        '& span' : {
            color: '#143eda'
        }
    },
    [theme.breakpoints.down('xl')]: {
        
    },
    [theme.breakpoints.down('lg')]: {
        form: {
            width: '35%', 
        },
        img: {
            width: '300px'
        },
    },
    [theme.breakpoints.down('md')]: {
        form: {
            width: '50%', 
        },
        img: {
            width: '275px'
        },
    },
    [theme.breakpoints.down('sm')]: {
        form: {
            width: '65%', 
        },
        img: {
            width: '250px'
        },
    },
    [theme.breakpoints.down('xs')]: {
        form: {
            width: '80%', 
        },
        img: {
            width: '225px'
        },
    },
});
    

