import { Theme, createStyles } from '@material-ui/core/styles';

export type historyStyles = ("container" |"gridTopUser"|"center"|"titre"| "h1" | "h2" | "hr" | "hr2" | "h1" | "containerHistory"
 | "ul" | "input" | "userAvatar" |"li" |'all'|'fonttext'|'libellé'|'tableauxHistorique'|'tabHistorique'|'tabHeader'|'detail'|'hrTitre' | 'textContainer'); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<historyStyles, {}>({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    all: {
    },
    fonttext:{
        color:'white',
    },
    input: {
        display: 'none',
    },
    gridTopUser:{
        marginTop:'10px',
        
    },
    titre: {
        marginTop: '70px',
        paddingLeft: '5%',
    },
    h2:{
        marginBottom:'30px'
    },
    hr: {
        border: '5px solid black',
        color:'black',
        borderRadius: '5px',
        width: '90%',
    },
    hr2: {
        border: '1px solid black',
        color:'black',
        borderRadius: '1px',
        width: '90%',
    },
    container: {
        margin: '20px 0px',
        padding: '0px 3.5%',
        width: '100%'
    },
    h1: {
        paddingTop: '20px',
        color: 'white',
        textAlign: 'center',
    },
    tableauxHistorique:{
        height:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingBottom:'2%'
    },
    tabHistorique:{
        backgroundColor:'white',
        borderRadius: '5px',
        border: '2px solid #EAECEE',
    },
    tabHeader:{
        backgroundColor:'#f7f7f9',
        borderRadius: '2px',
    },
    textContainer: {
        padding: '10px 15px',
        '& p': {
            margin: '5px 0',
        }
    },
    containerHistory: {
        backgroundColor:'white',
        borderRadius: '2px',
        height: 'auto',
        border: '2px solid black'
    },
    ul: {
        listStyle:'none',
        color: 'white',
        fontsize: '20px',
    },
    li:{
        display : 'inline',
        fontsize:'10px',
        paddingBottom: '10px',
        color:'black',
        textAlign:'justify',
    },
    detail:{
        textAlign:'justify',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    libellé:{
        fontWeight:'bold',
        paddingLeft: '5%',
    },
    hrTitre:{
        margin: '0',
    },
    userAvatar:{
        height:'100px', 
        width: '100px',
        borderRadius: '50%'
    },
    [theme.breakpoints.down('xl')]: {
        
    },
    [theme.breakpoints.down('lg')]: {
        img: {
            width: '375px'
        },
    },
    [theme.breakpoints.down('md')]: {
        rightSide: {
            display: 'none',
        },
        img: {
            width: '350px'
        },
    },
    [theme.breakpoints.down('sm')]: {
        form: {
            width: '70%',
        },
        img: {
            width: '325px'
        },
    },
    [theme.breakpoints.down('xs')]: {
        form: {
            width: '80%',
        },
        img: {
            width: '300px'
        },
        all : {
            width : '300%'
        },
    },
});
    

