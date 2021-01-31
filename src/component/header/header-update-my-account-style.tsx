import { Theme, createStyles } from '@material-ui/core/styles';

export type HeaderBarUpdateMyAccountStyles = ( "menu" | "center" | "logo1" | "logo2" | "logoDiv" |"connexionUser" | "connexionUserDiv"|"connexionUserA"|"connexionUserB"); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<HeaderBarUpdateMyAccountStyles, {}>({
    center : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    logoDiv : {
        marginLeft: '25px',
    },
    logo1 : {
        width: '65px',
        height: '65px',
    },
    logo2 : {
        marginLeft: '25px',
        marginTop: '-5px',
        width: '225px',
        height: '225px',
    },
    connexionUserDiv : {
        marginLeft: '10px',
        width:'40%',
        // border: '2px solid #52BE80',
        borderRadius:'10px', 
        paddingTop:'20px'
    },
    connexionUser : {
        color: '#52BE80',
        textAlign:'center',
        fontSize:'18px'
    },
    connexionUserA:{
        color: '#52BE80'
    },
    connexionUserB:{
        color: '#52BE80'
        // backgroundColor:'black',
        // fontColor:"white",
        // borderStyle:'solid',
        // borderRadius:'10px',
        // padding: "2px"
    },
    menu: {
        width: '-webkit-fill-available',
        marginLeft: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& span' : {
            color: 'white',
            fontSize: '22px',
            marginLeft: '45px',
        },
        '& span a' : {
            color: 'white',
            fontSize: '22px',
            textDecoration: 'none'
        },
        '& span a:hover' : {
            color: '#ADADAE',
            fontSize: '22px',
            textDecoration: 'none'
        }
    }
});
    

