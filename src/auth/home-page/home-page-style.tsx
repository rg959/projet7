import { Theme, createStyles } from '@material-ui/core/styles';
import ville from '../../assets/img/ville.png';

export type homePageStyles = ("center" | "form" | "back" | "mainDiv" | "img" | "container"
| "link" | "subtitle" | "passwordLost"|"ligneBlanche1"|"ligneBlanche"|"dotted"|"voiture"|"annimation"|"client"
|"boxDroite"|"fondVille"|"marquee"|"fondVilleImage"|"containerLeft"); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<homePageStyles, {}>({
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
        width: '30%', 
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
    // -----Animation-----
    containerLeft:{
        
    },
    annimation:{
        top:'-50px',
        maxWidth:'100%',
        width:'100%'
    },
    fondVille:{
       height:'100px',
       backgroundImage: 'url(" + ville + ")'

    },
    fondVilleImage:{
        width:'100%'
    },

    ligneBlanche1:{
        width:'100%',
        height:'5px',
        backgroundColor:'white',
        marginBottom:'60px'
    },
    ligneBlanche:{
        width:'100%',
        height:'5px',
        backgroundColor:'white',
        color: 'orange',
     marginTop: '60px',
    },



    dotted:{
        border: '20px dashed #fff',
        borderStyle: 'none none dashed',
        color: 'black',
        backgroundColor: 'black',
     },
     marquee:{
        overflow:'hidden',
        whitespace: 'nowrap',
     },
     voiture:{
        height:'100px',
        width:'100%',
        marginTop:'-100px',
        float:'right',
        left:'0px'
     },
     client:{
        height:'200px',
        width:'200px',
        marginTop:'-100px',
      
     },
     boxDroite:{
        border:'5px solid white',
        paddingTop:'50px',
        paddingBottom:'70px',
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
        containerLeft:{
            display:'none',
        },
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
    

