import { Theme, createStyles } from '@material-ui/core/styles';

export type registerStyles = ("center" | "form" | "back" | "mainDiv" | "img" | "container"
| "link" | "subtitle" | "passwordLost"); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<registerStyles, {}>({
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
        marginTop: '-2rem',
        textAlign:'center'
    },
    mainDiv: {
        height: '100vh',
    },
    img: {
        marginTop: '-7rem',
        width: '325px'
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
        marginTop: '2rem',
    },
    passwordLost: {
        marginTop: '0.5rem',
        textAlign: 'right',
    },
    [theme.breakpoints.down('xl')]: {
        
    },
    [theme.breakpoints.down('lg')]: {
        form: {
            width: '40%', 
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
    

