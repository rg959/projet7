import { Theme, createStyles } from '@material-ui/core/styles';

export type updateMyAccountStyles = ("container" | "h1" |"left" | "hr" |"containerUser" | "center" |
 "btnAvatar" |"btnUpdateUser" | "input" | "userAvatar"|"form" | "formId" | "checked" |"a" | "alert" | "leftSucces"|"succesIcone"|
"iconDelete"|"containerBtnvalider"|"blocBtn"|"textDelete"|"btnDeleteAccount"|"iconDeleteAccount"|"btnValidationDeleteAccount" 
|"btnCancelDeleteAccount"|"iconCamera"|"all"|"brDA"); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<updateMyAccountStyles, {}>({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    all:{

    },
    input: {
        display: 'none',
      },
    h1: {
        marginTop: '70px',
        paddingLeft: '5%',
    },
    hr: {
        border: '5px solid black',
        color:'black',
        borderRadius: '5px',
        width: '90%',
    },
    container: {
        marginTop: '5vh',
        width: '90%',
        display : 'table',
        margin : '0 auto',
        
    },

    containerUser: {
        border: '5px solid black',
        paddingTop:'100px',
        backgroundColor:'white',
        height:'auto',
        borderRadius: '20px',
        paddingBottom:'80px',
        
    },
    containerBtnvalider:{
        width:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    btnDeleteAccount:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        border: '1px solid white',
        borderColor: '#A93226',
        color:'#A93226',  
        '&:hover' : {
            backgroundColor:'black',
            border: '1px solid white',
            borderColor: '#A93226',
            color:'#A93226',
            fontWeight:'bold'
        }
        
    },

    iconDeleteAccount:{
        color: '#A93226',
    },
    btnValidationDeleteAccount:{
        backgroundColor:'green',
        color: '#ffffff',
        '&:hover' : {
            backgroundColor:'green',
            color: '#000000',
            fontWeight:'bold'
        }
    },
    btnCancelDeleteAccount:{
        backgroundColor:'red',
        color: '#ffffff',
        '&:hover' : {
            backgroundColor:'red',
            color: '#000000',
            fontWeight:'bold'
        }
    },
    iconCamera:{
        '& hover':{
            color: '#7FB3D5',
        }
    },
    left:{
        backgroundColor:'',
        paddingLeft:'40px'
        
    },
    btnAvatar:{
        marginTop: '20px',
        backgroundColor:'black',
        border: '1px solid white',

        '&:hover' : {
        backgroundColor: 'black',
        borderColor:'#7FB3D5',
        color:'#7FB3D5'
        }
    },
    blocBtn:{
        paddingLeft: '40px'
    },
    iconDelete:{
        color:'white',
        float:"left",
       backgroundColor:'#008ab6',
    },
    btnUpdateUser: {
        textAlign:'center',
        backgroundColor: 'white',
        border: '5px solid black',
        borderRadius: '60px',
        width: '60%',
        height: '75px',
        fontSize: '20px',
        color:'black',
        alignItems:'center',
        margin:'auto',
        marginTop:'4vh',
        '&:hover' :{
            border: '1px solid black',
            backgroundColor:'black',
            color:'white',
            textDecoration:'none',
        },
        // '& span' : {
        //     color: 'white',
        // },
        // '& a' : {
        //     color: 'white',
        // },
        // '& a:hover' : {
        //     color: 'black',
        //     textDecoration: 'none'
        // },
    },
    userAvatar:{
        // marginLeft:"25px",
        height:'200px', 
        width: '200px',
        borderRadius: '50%',
        margin: 'auto'
    },
    form:{
        backgroundColor:'white',
        color: 'black',
    },
    formId:{
        width:'90%',
        marginBottom: '20px',
        backgroundColor:'white',
        color: 'white',
    },
    checked:{
        // backgroundColor:'white',
        color:'black'
    },
    a:{
        textDecoration:'underline',
        color:'white',
    },
    textDelete:{
        color:'white',
        fontSize:'15px'
  
    },
    alert: {
        marginTop: '40px',
        float:'left',
        width:'85%',
        marginRight: '5%',
        // marginTop: '10px',
        // marginLeft: '10%',
        // marginRight: '10%',

    },
    leftSucces: {
        // backgroundColor:'orange',
        // marginRight:'10%',
    },
    succesIcone:{
        height:'40px',
        marginRight:'10px'
    },
    [theme.breakpoints.down('xl')]: {
        
    },
    [theme.breakpoints.down('lg')]: {
        img: {
            width: '375px'
        },
    },
    brDA:{
        display:'none'
    },
    [theme.breakpoints.down('md')]: {
        rightSide: {
            display: 'none',
        },
        img: {
            width: '350px'
        },
        btnAvatar: {
            width: '100%',
        },
        // btnDeleteAccount:{
        //     margin: 'auto',
        //     textAlign: 'center',
        // },
        blocBtn:{
            // margin: 'auto',
            // textAlign: 'center',
        },
    },
    [theme.breakpoints.down('sm')]: {
        containerUser:{
            margin: 'auto',
        },
        userAvatar:{
            margin: 'auto'
        },
        form: {
            width: '100%',
            margin:'auto',
            textAlign: 'center',
        },
        img: {
            width: '325px'
        },
        all: {
            width: '200%',
        }, 
        btnDeleteAccount:{
            // margin: 'auto',
            // textAlign: 'center',
        },
        btnAvatar: {
            width: '100%',
        },
        // left:{
        //     paddingLeft: '0px'
        // },
        brDA:{
            display:'block'
        },
        left:{
            margin: 'auto'
        },
        input:{
            width: '500px'
        },
        blocBtn:{
            margin: 'auto',
            textAlign: 'center'

        }
     
    },
    [theme.breakpoints.down('xs')]: {
        h1:{
            fontSize: '20px',
            textAlign: 'center'
        },
        userAvatar:{
            margin: 'auto'
        },
        form: {
            width: '100%',
            margin:'auto',
            textAlign: 'center',
        },
        img: {
            width: '300px'
        },
        all: {
            width: '205%',
        },
        btnAvatar: {
            marginBottom: '10px'
        },
        btnDeleteAccount:{
            margin: 'auto',
            textAlign: 'center',
        },
        left:{
            margin: 'auto'
        },  
        blocBtn:{
            margin: 'auto',
            textAlign: 'center'
        }

    },
});
    

