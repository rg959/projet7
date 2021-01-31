import { Theme, createStyles } from '@material-ui/core/styles';
import avatar from '../../assets/img/linux-avatar.png';

export type headerBarStyles = ("avatar" | "menu" | "center" | "img" | "logo1" | "logo2" | "logoDiv" | "pointer"|"connexionUserDiv"|"connexionUser"); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<headerBarStyles, {}>({
    center : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    avatar: {
        background: 'white',
        borderRadius: '50%',
        width: '140px',
        height: '140px',
        border: '1px solid #00000050',
        marginTop: '5vh',
        zIndex: 3
    },
    img: {
        backgroundImage: `url(${avatar})`,
        width: '140px',
        height: '140px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',   
        borderRadius: '50%',
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
    },
    pointer: {
        cursor : 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        HtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
    },
    connexionUserDiv : {
        marginLeft: '10px',
        width:'50%',
        // border: '2px solid #52BE80',
        borderRadius:'10px', 
        paddingTop:'20px'
    },
    connexionUser : {
        color: '#52BE80',
        textAlign:'center',
        fontSize:'18px'
    },
});
    

